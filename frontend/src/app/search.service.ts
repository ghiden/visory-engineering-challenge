import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchParams } from './search-params';
import { SearchResults } from './search-results';

const pageSize = 20;
const API_URL = 'http://localhost:3000/api/v1/events';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getEvents(options: SearchParams = { page: 0 }) {
    const sanitizedOptions = Object.fromEntries(
      Object.entries(options)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          if (key === 'startDateTime' || key === 'endDateTime') {
            return [key, new Date(value).toISOString()];
          }
          return [key, value];
        }),
    );
    const params = new URLSearchParams({
      ...sanitizedOptions,
      page: sanitizedOptions['page'].toString(),
      size: pageSize.toString(),
    });
    return this.http.get<SearchResults>(`${API_URL}?${params.toString()}`);
  }
}
