export interface SearchResults {
  events: SearchEvent[];
  page: SearchPageInfo;
}

export interface SearchPageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface SearchEvent {
  name: string;
}