import type { AxiosError } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  error?: AxiosError;
}
