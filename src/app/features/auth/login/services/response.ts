export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  error?: Error;
}
