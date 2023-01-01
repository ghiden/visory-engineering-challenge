import express from 'express';
import { GaxiosError, GaxiosResponse, request } from 'gaxios';
import { ZodError } from 'zod';
import { EventSearchQueryParamsSchema, EventSearchQueryParams } from '../schemas/event-search-query-params.schema';
import { Events } from '../schemas/events.schema';

const router = express.Router();
const countryCode = 'AU';
const locale = 'en-AU';

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     tags:
 *       - Event
 *     description: Searches events
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 500
 *           default: 20
 *         description: Page size
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Page index starting from 0
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Location to search for
 *       - in: query
 *         name: startDateTime
 *         schema:
 *           type: string
 *         description: Start date time in ISO-8601 format
 *       - in: query
 *         name: endDateTime
 *         schema:
 *           type: string
 *         description: End date time in ISO-8601 format
 *     responses:
 *       200:
 *         description: Returns events
 */
router.get('/', async (req, res) => {
  let queryParams: EventSearchQueryParams;

  try {
    queryParams = EventSearchQueryParamsSchema.parse(req.query);
  } catch (err) {
    const zodError = err as ZodError;
    console.error(zodError.issues);
    return res.status(400).json(zodError.issues);
  }

  const { size, page, city, startDateTime, endDateTime } = queryParams;
  const apikey = process.env.API_KEY;
  const params = {
    apikey,
    locale,
    countryCode,
    size,
    page,
    city,
    startDateTime,
    endDateTime,
  };

  const url = `${process.env.API_URL}/discovery/v2/events`;

  let tmRes: GaxiosResponse;
  try {
    tmRes = await request({
      params,
      url,
    });
  } catch (err) {
    const gaxiosError = err as GaxiosError;
    console.error(gaxiosError);
    res.status(Number(gaxiosError.code)).json(gaxiosError.response!.data);
    return;
  }

  // very unlikely to happen but just in case
  try {
    const response = Events.parse(tmRes.data);
    res.json(response);
  } catch (err) {
    const zodError = err as ZodError;
    console.error(zodError);
    res.status(500).json(zodError.issues);
    return;
  }
});

export default router;
