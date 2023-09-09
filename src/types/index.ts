export interface Pagination {
  isNextPage: boolean;
  currentPage: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ResponseAPI<D> {
  data: D;
  error: string;
}

export interface ResponsePaginationAPI<D> {
  data: D;
  error: string;
  pagination: Pagination;
}

export enum ACCESS {
  PUBLIC = 'public',
  PRIVATE = 'private'
}