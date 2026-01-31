import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const throwError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || error.message);
  }

  throw new Error(String(error));
};
