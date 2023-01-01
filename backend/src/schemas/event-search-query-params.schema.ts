import { z, TypeOf } from 'zod';

export const EventSearchQueryParamsSchema = z.object({
  page: z.coerce.number().min(0).default(0),
  size: z.coerce.number().min(1).max(500).default(20),
  city: z.string().optional(),
  startDateTime: z.string().datetime().optional(),
  endDateTime: z.string().datetime().optional(),
})
  .transform((params) => {
    const startDateTime = params.startDateTime && `${params.startDateTime.split('.')[0]}Z`;
    const endDateTime = params.endDateTime && `${params.endDateTime.split('.')[0]}Z`;
    return {
      ...params,
      startDateTime,
      endDateTime,
    };
  });

export type EventSearchQueryParams = TypeOf<typeof EventSearchQueryParamsSchema>;
