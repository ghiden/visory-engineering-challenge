export interface SearchParams {
  city?: string;
  startDateTime?: string;
  endDateTime?: string;
  page: number;
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