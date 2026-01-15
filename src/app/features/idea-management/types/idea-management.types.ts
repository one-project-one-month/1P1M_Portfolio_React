export type PaginationType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
