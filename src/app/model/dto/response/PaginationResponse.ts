export interface PaginationResponse<T> {
  data?: T[];
  paginationInfo?: {
    currentPage?: number;
    pageSize?: number;
    sortBy?: string;
    totalPages?: number;
    totalItems?: number;
  }
  messages?: string[];
}
