import { createSecureStorage } from '@/lib/storage-config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  username: string;
  userId: number;
  role: string;
}

interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      userInfo: null,

      setUserInfo: (user) => set({ userInfo: user }),

      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'user info store',
      storage: createSecureStorage<UserInfoStore>(),
    },
  ),
);
