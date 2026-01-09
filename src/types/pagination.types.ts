export type PaginationType = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export type ArrowButtonType = {
  icon: string;
  onClick: () => void;
  disabled: boolean;
  altText: string;
};
