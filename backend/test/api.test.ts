import request from 'supertest';
import nock from 'nock';

import app from '../src/app';

describe('GET /api/v1/docs', () => {
  it('responds with a swagger page', async () => {
    const res = await request(app)
      .get('/api/v1/docs/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/);
    expect(res.status).toEqual(200);
    expect(res.text).toContain('Swagger UI');
  });

  it('responds with an openapi json message when json format is requested', async () => {
    const res = await request(app)
      .get('/api/v1/docs.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      components: {},
      info: {
        title: 'REST API Docs',
        version: '1.2.0',
      },
      openapi: '3.0.0',
      paths: {
        '/api/v1/events': {
          get: {
            description: 'Searches events',
            parameters: [
              {
                description: 'Page size',
                in: 'query',
                name: 'size',
                schema: {
                  default: 20,
                  maximum: 500,
                  minimum: 1,
                  type: 'integer',
                },
              },
              {
                description: 'Page index starting from 0',
                in: 'query',
                name: 'page',
                schema: {
                  default: 0,
                  minimum: 0,
                  type: 'integer',
                },
              },
              {
                description: 'Location to search for',
                in: 'query',
                name: 'city',
                schema: {
                  type: 'string',
                },
              },
              {
                description: 'Start date time in ISO-8601 format',
                in: 'query',
                name: 'startDateTime',
                schema: {
                  type: 'string',
                },
              },
              {
                description: 'End date time in ISO-8601 format',
                in: 'query',
                name: 'endDateTime',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Returns events',
              },
            },
            tags: [
              'Event',
            ],
          },
        },
      },
      tags: [],
    });
  });
});

describe('GET /api/v1/events', () => {
  const apiKey = process.env.API_KEY!;
  const apiHost = process.env.API_URL!;
  const apiPath = '/discovery/v2/events';
  const apiDefaultParams = {
    apikey: apiKey,
    locale: 'en-AU',
    countryCode: 'AU',
    size: 20,
    page: 0,
  };
  const url = '/api/v1/events';

  it('sends a request to TicketMasster with default params and responds with a json message', async () => {
    const scope = nock(apiHost)
      .get(apiPath)
      .query(apiDefaultParams)
      .reply(200, {
        page: {
          size: 20,
          totalElements: 0,
          totalPages: 0,
          number: 0,
        },
      });
    const res = await request(app)
      .get(url)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    scope.done();
  });

  it('responds with an error when "size" is less than 1', async () => {
    const size = 0;
    const params = new URLSearchParams({ size: size.toString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      {
        code: 'too_small',
        minimum: 1,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Number must be greater than or equal to 1',
        path: ['size'],
      },
    ]);
  });

  it('responds with an error when "size" is greater than 500', async () => {
    const size = 501;
    const params = new URLSearchParams({ size: size.toString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      {
        code: 'too_big',
        maximum: 500,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Number must be less than or equal to 500',
        path: ['size'],
      },
    ]);
  });

  it('sends a request to TicketMasster with a given "size" and responds with a json message', async () => {
    const size = 10;
    const scope = nock(apiHost)
      .get(apiPath)
      .query({ ...apiDefaultParams, size })
      .reply(200, {
        page: {
          size,
          totalElements: 0,
          totalPages: 0,
          number: 0,
        },
      });
    const params = new URLSearchParams({ size: size.toString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    scope.done();
  });

  it('responds with an error when "page" is less than 0', async () => {
    const page = -1;
    const params = new URLSearchParams({ page: page.toString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      {
        code: 'too_small',
        minimum: 0,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Number must be greater than or equal to 0',
        path: ['page'],
      },
    ]);
  });

  it('sends a request to TicketMasster with a given "page" and responds with a json message', async () => {
    const page = 1;
    const scope = nock(apiHost)
      .get(apiPath)
      .query({ ...apiDefaultParams, page })
      .reply(200, {
        page: {
          size: 20,
          totalElements: 0,
          totalPages: 0,
          number: page,
        },
      });
    const params = new URLSearchParams({ page: page.toString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    scope.done();
  });

  it('sends a request to TicketMasster with a given "city" and responds with a json message', async () => {
    const city = 'Sydney';
    const scope = nock(apiHost)
      .get(apiPath)
      .query({ ...apiDefaultParams, city })
      .reply(200, {
        page: {
          size: 20,
          totalElements: 0,
          totalPages: 0,
          number: 0,
        },
      });
    const params = new URLSearchParams({ city });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    scope.done();
  });

  it('sends a request to TicketMasster with a given "startDateTime" and responds with a json message', async () => {
    const startDateTime = '2023-05-05T12:00:00Z';
    const scope = nock(apiHost)
      .get(apiPath)
      .query({ ...apiDefaultParams, startDateTime })
      .reply(200, {
        page: {
          size: 20,
          totalElements: 0,
          totalPages: 0,
          number: 0,
        },
      });
    // handles Date.toISOString format
    const params = new URLSearchParams({ startDateTime: new Date(startDateTime).toISOString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    scope.done();
  });

  it('sends a request to TicketMasster with a given "endDateTime" and responds with a json message', async () => {
    const endDateTime = '2023-05-05T12:00:00Z';
    const scope = nock(apiHost)
      .get(apiPath)
      .query({ ...apiDefaultParams, endDateTime })
      .reply(200, {
        page: {
          size: 20,
          totalElements: 0,
          totalPages: 0,
          number: 0,
        },
      });
    // handles Date.toISOString format
    const params = new URLSearchParams({ endDateTime: new Date(endDateTime).toISOString() });
    const res = await request(app)
      .get(`${url}?${params.toString()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toEqual(200);
    scope.done();
  });
});
