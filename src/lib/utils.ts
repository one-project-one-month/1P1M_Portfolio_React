import { LogoutUser } from '@/app/features/auth/login/services/api';

import { clsx, type ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = async () => {
  try {
    await LogoutUser();
  } catch (error) {
    throw error;
  }
};

export const copyToClipboard = async (value?: string | null) => {
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);

    toast.success('Copied to clipboard');
  } catch {
    toast.error('Could not copy to clipboard.');
  }
};
