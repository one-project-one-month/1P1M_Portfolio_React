import type { ProfileFormValues } from '@/app/features/admin-profile/types.ts';

export const profileService = {
  updateProfile: async (data: ProfileFormValues) => {
    // Simulate API delay
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
