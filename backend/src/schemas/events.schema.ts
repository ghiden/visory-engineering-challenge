import { z } from 'zod';

const TmDate = z.object({
  localDate: z.string(),
  localTime: z.string().optional(),
  dateTime: z.string().datetime().optional(),
});

const TmVenue = z.object({
  name: z.string(),
  url: z.string(),
  postalCode: z.string(),
  city: z.object({
    name: z.string(),
  }),
  state: z.object({
    name: z.string(),
    stateCode: z.string(),
  }),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    line3: z.string().optional(),
  }),
});

const TmEvent = z.object(
  {
    name: z.string(),
    id: z.string(),
    description: z.string().optional(),
    url: z.string(),
    dates: z.object({
      start: TmDate,
      end: TmDate.optional(),
    }),
    _embedded: z.object({
      venues: z.array(TmVenue),
    }),
  },
)
  .transform(({ name, id, description, url, dates, _embedded }) => ({
    name, 
    id,
    description,
    url,
    dates,
    venues: _embedded.venues,
  }));

export const Events = z.object({
  _embedded: z.object({
    events: z.array(TmEvent),
  }).optional(),
  page: z.object({
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    number: z.number(), 
  }),
})
  .transform((tmEvent) => ({
    ...(tmEvent._embedded),
    page: tmEvent.page,
  }));
