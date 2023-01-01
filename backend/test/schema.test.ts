import { Events } from '../src/schemas/events.schema';

describe('schemas: TmEvents', () => {
  it('transforms a TicketMaster events response into an Events', () => {
    const rawResponse = {
      '_embedded': {
        'events': [
          {
            'name': 'Hobart International 2023 - Single Session (Day)',
            'type': 'event',
            'id': 'G5efZ9f9LV4c-',
            'test': false,
            'url': 'https://www.ticketmaster.com.au/hobart-international-2023-single-session-day-hobart-09-01-2023/event/25005D45DFD15B61',
            'locale': 'en-au',
            'images': [
              {
                'ratio': '16_9',
                'url': 'https://s1.ticketm.net/dam/a/ff8/1708c556-5cd6-4985-979b-a4c27666fff8_1813751_RECOMENDATION_16_9.jpg',
                'width': 100,
                'height': 56,
                'fallback': false,
              },
            ],
            'sales': {
              'public': {
                'startDateTime': '2022-10-19T03:00:00Z',
                'startTBD': false,
                'startTBA': false,
                'endDateTime': '2023-01-09T00:00:00Z',
              },
              'presales': [
                {
                  'startDateTime': '2022-10-17T03:00:00Z',
                  'endDateTime': '2022-10-19T01:00:00Z',
                  'name': 'Presale',
                },
              ],
            },
            'dates': {
              'start': {
                'localDate': '2023-01-09',
                'localTime': '11:00:00',
                'dateTime': '2023-01-09T00:00:00Z',
                'dateTBD': false,
                'dateTBA': false,
                'timeTBA': false,
                'noSpecificTime': false,
              },
              'timezone': 'Australia/Hobart',
              'status': {
                'code': 'onsale',
              },
              'spanMultipleDays': false,
            },
            'classifications': [
              {
                'primary': true,
                'segment': {
                  'id': 'KZFzniwnSyZfZ7v7nE',
                },
                'genre': {
                  'id': 'KnvZfZ7vAAv',
                },
                'subGenre': {
                  'id': 'KZazBEonSMnZfZ7vFnd',
                },
                'type': {
                  'id': 'KZAyXgnZfZ7v7nI',
                },
                'subType': {
                  'id': 'KZFzBErXgnZfZ7v7lJ',
                },
                'family': false,
              },
            ],
            'info': '.',
            'priceRanges': [
              {
                'type': 'standard including fees',
                'currency': 'AUD',
                'min': 25,
                'max': 75,
              },
              {
                'type': 'standard',
                'currency': 'AUD',
                'min': 24.57,
                'max': 73.61,
              },
              {
                'type': 'standard',
                'currency': 'AUD',
                'min': 22.19,
                'max': 71.23,
              },
            ],
            'seatmap': {
              'staticUrl': 'https://s1.ticketm.net/tmimages/venue/maps/au2/99434s.gif',
            },
            'accessibility': {},
            'ageRestrictions': {
              'legalAgeEnforced': false,
            },
            'ticketing': {
              'safeTix': {
                'enabled': false,
              },
            },
            '_links': {
              'self': {
                'href': '/discovery/v2/events/G5efZ9f9LV4c-?locale=en-au',
              },
              'attractions': [
                {
                  'href': '/discovery/v2/attractions/K8vZfZ7edA6?locale=en-au',
                },
              ],
              'venues': [
                {
                  'href': '/discovery/v2/venues/KovZ917AxAj?locale=en-au',
                },
              ],
            },
            '_embedded': {
              'venues': [
                {
                  'name': 'Domain Tennis Centre',
                  'type': 'venue',
                  'id': 'KovZ917AxAj',
                  'test': false,
                  'url': 'https://www.ticketmaster.com.au/domain-tennis-centre-tickets-hobart/venue/304418',
                  'locale': 'en-au',
                  'postalCode': '7000',
                  'timezone': 'Australia/Hobart',
                  'city': {
                    'name': 'Hobart',
                  },
                  'state': {
                    'name': 'Tasmania',
                    'stateCode': 'TAS',
                  },
                  'country': {
                    'name': 'Australia',
                    'countryCode': 'AU',
                  },
                  'address': {
                    'line1': '2 Davies Avenue',
                  },
                  'location': {
                    'longitude': '151.28269',
                    'latitude': '-33.84991',
                  },
                  'markets': [
                    {
                      'name': 'All of Australia',
                      'id': '301',
                    },
                    {
                      'name': 'Tasmania',
                      'id': '308',
                    },
                  ],
                  'dmas': [
                    {
                      'id': 701,
                    },
                    {
                      'id': 707,
                    },
                  ],
                  'upcomingEvents': {
                    '_total': 11,
                    'ticketmaster': 11,
                    '_filtered': 0,
                  },
                  'ada': {
                    'adaPhones': 'Telephone:&#13;&#10;1300 446 925&#13;&#10;&#13;&#10;Or&#13;&#10;&#13;&#10;Email:&#13;&#10;Email your Accessible Seating request to accessibletickets@ticketmaster.com.au. Please ensure you include the Event Name, Venue, Date and Time along with your contact details.',
                    'adaCustomCopy': 'Please call Ticketmaster’s Accessible Seating Line if you have Wheelchair, Companion Card or Special Needs booking requirements.',
                    'adaHours': 'Monday – Saturday 9am-8pm; Sunday 9am-5pm AEST (closed Christmas/Boxing Day)',
                  },
                  '_links': {
                    'self': {
                      'href': '/discovery/v2/venues/KovZ917AxAj?locale=en-au',
                    },
                  },
                },
              ],
              'attractions': [
                {
                  'name': 'Hobart International',
                  'type': 'attraction',
                  'id': 'K8vZfZ7edA6',
                  'test': false,
                  'url': 'https://www.ticketmaster.com.au/hobart-international-tickets/artist/2686782',
                  'locale': 'en-au',
                  'images': [
                    {
                      'ratio': '16_9',
                      'url': 'https://s1.ticketm.net/dam/a/ff8/1708c556-5cd6-4985-979b-a4c27666fff8_1813751_RECOMENDATION_16_9.jpg',
                      'width': 100,
                      'height': 56,
                      'fallback': false,
                    },
                  ],
                  'classifications': [
                    {
                      'primary': true,
                      'segment': {
                        'id': 'KZFzniwnSyZfZ7v7nE',
                      },
                      'genre': {
                        'id': 'KnvZfZ7vAAv',
                      },
                      'subGenre': {
                        'id': 'KZazBEonSMnZfZ7vFnd',
                      },
                      'type': {
                        'id': 'KZAyXgnZfZ7v7lt',
                      },
                      'subType': {
                        'id': 'KZFzBErXgnZfZ7vAkJ',
                      },
                      'family': false,
                    },
                  ],
                  'upcomingEvents': {
                    '_total': 11,
                    'ticketmaster': 11,
                    '_filtered': 0,
                  },
                  '_links': {
                    'self': {
                      'href': '/discovery/v2/attractions/K8vZfZ7edA6?locale=en-au',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      '_links': {
        'first': {
          'href': '/discovery/v2/events?startDateTime=2023-01-05T12%3A00%3A00Z&city=Hobart&countryCode=AU&locale=en-AU&page=0&size=1',
        },
        'self': {
          'href': '/discovery/v2/events?startDateTime=2023-01-05T12%3A00%3A00Z&size=1&city=Hobart&countryCode=AU&page=0&locale=en-AU',
        },
        'next': {
          'href': '/discovery/v2/events?startDateTime=2023-01-05T12%3A00%3A00Z&city=Hobart&countryCode=AU&locale=en-AU&page=1&size=1',
        },
        'last': {
          'href': '/discovery/v2/events?startDateTime=2023-01-05T12%3A00%3A00Z&city=Hobart&countryCode=AU&locale=en-AU&page=13&size=1',
        },
      },
      'page': {
        'size': 1,
        'totalElements': 14,
        'totalPages': 14,
        'number': 0,
      },
    };
    const parsedResponse = Events.parse(rawResponse);
    const expected = {
      'events': [
        {
          'name': 'Hobart International 2023 - Single Session (Day)',
          'id': 'G5efZ9f9LV4c-',
          'url': 'https://www.ticketmaster.com.au/hobart-international-2023-single-session-day-hobart-09-01-2023/event/25005D45DFD15B61',
          'dates': {
            'start': {
              'localDate': '2023-01-09',
              'localTime': '11:00:00',
              'dateTime': '2023-01-09T00:00:00Z',
            },
          },
          'venues': [
            {
              'name': 'Domain Tennis Centre',
              'url': 'https://www.ticketmaster.com.au/domain-tennis-centre-tickets-hobart/venue/304418',
              'postalCode': '7000',
              'city': {
                'name': 'Hobart',
              },
              'state': {
                'name': 'Tasmania',
                'stateCode': 'TAS',
              },
              'address': {
                'line1': '2 Davies Avenue',
              },
            },
          ],
        },
      ],
      'page': {
        'size': 1,
        'totalElements': 14,
        'totalPages': 14,
        'number': 0,
      },
    };
    expect(parsedResponse).toEqual(expected);
  });

  it('transforms an empty TicketMaster events response into an Events', () => {
    const rawResponse = {
      '_links': {
        'self': {
          'href': '/discovery/v2/events?startDateTime=2023-01-05T12%3A00%3A00Z&size=1&city=Hobart&countryCode=AU&page=0&locale=en-AU',
        },
      },
      'page': {
        'size': 1,
        'totalElements': 14,
        'totalPages': 14,
        'number': 0,
      },
    };
    const parsedResponse = Events.parse(rawResponse);
    const expected = {
      'page': {
        'size': 1,
        'totalElements': 14,
        'totalPages': 14,
        'number': 0,
      },
    };
    expect(parsedResponse).toEqual(expected);
  });
});
