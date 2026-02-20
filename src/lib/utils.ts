import { useUserInfoStore } from '@/store/user-info-store';

import { clsx, type ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = () => {
  useUserInfoStore.getState().clearUserInfo();
  window.location.href = '/';
};

export const copyToClipboard = async (
  value?: string | null,
  // label: string = 'Copied',
) => {
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);

    toast.success('Copied to clipboard');
  } catch {
    toast.error('Could not copy to clipboard.');
  }
};
