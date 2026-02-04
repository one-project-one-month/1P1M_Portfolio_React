export type MetaType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  method: string;
  endpoint: string;
};

export type ApiResponseType<T = string> = {
  success: boolean;
  code: number;
  meta?: MetaType;
  data: T;
  message: string;
};
