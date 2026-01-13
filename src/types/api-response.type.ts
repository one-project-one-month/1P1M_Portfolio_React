export type MetaType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  method: string;
  endpoint: string;
};

export type ApiResponseType<T> = {
  success: boolean;
  code: number;
  message: string;
  meta?: MetaType;
  data: T;
};
