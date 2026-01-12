export interface CheckEmail {
  id: string;
}

export interface SendOTP {
  id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T | null;
  error?: Error;
}
