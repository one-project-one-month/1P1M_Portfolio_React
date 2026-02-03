export type MetaType = {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  method?: string;
  endpoint?: string;
  timestamp?: number;
};

export type ApiResponseType<T> = {
  success: number;
  code: number;
  message: string;
  meta: MetaType;
  data: T;
};
