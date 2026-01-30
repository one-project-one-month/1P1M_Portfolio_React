import type { ProfileFormValues } from '@/app/features/admin-profile/types.ts';

export const profileService = {
  updateProfile: async (data: ProfileFormValues) => {
    console.log('Updating profile with:', data);
    // Simulate API delay
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
