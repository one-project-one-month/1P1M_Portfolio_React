import { useUserInfoStore } from '@/store/user-info-store';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = () => {
  useUserInfoStore.getState().clearUserInfo();
  window.location.href = '/';
};
