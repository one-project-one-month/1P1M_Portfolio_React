export type OpomUserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  telegram_username: string;
  role: string;
  userId: number;
};
export type GetAllOpomRegisterParams = {
  keyword?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
};
export type PaginationMetaType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type ApiListResponseType<T> = {
  success: number;
  code: number;
  message: string;
  meta: PaginationMetaType;
  data: T[];
};
export type OpomRegisteredListtHeaderType = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
};
export type OpomRegisteredListTableType = {
  data: OpomUserType[];
  handleViewDetail: (id: number) => void;
};
export type OpomRegisteredListContainePropsType = {
  searchQuery?: string;
  selectedFilter?: string;
  sortedField?: string;
  page: number;
  size: number;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
  totalUser: number;
};

export type GetAllOpomRegisterResponseType = ApiListResponseType<OpomUserType>;
