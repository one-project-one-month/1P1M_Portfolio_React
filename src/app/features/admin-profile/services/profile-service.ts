import apiClient from '@/api/axios.ts';
import { API_ENDPOINTS } from '@/config/api.ts';
import { type ProfileFormValues } from '../services/types';

export const profileService = {
  getProfile: async (userId: number): Promise<ProfileFormValues> => {
    const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE_DATA, {
      params: { userId },
    });

    const dev = response.data.data.devProfile;

    return {
      name: dev.name || 'Admin User',
      email: dev.email,
      avatarUrl: dev.profilePictureUrl || 'https://i.pravatar.cc/300',
      socialAccounts: [
        ...(dev.telegramUsername
          ? [{ platform: 'Telegram', url: dev.telegramUsername }]
          : []),
        ...(dev.github ? [{ platform: 'GitHub', url: dev.github }] : []),
        ...(dev.linkedIn ? [{ platform: 'LinkedIn', url: dev.linkedIn }] : []),
      ],
      phoneNumber: dev.phone || '+95-9XXX-XXX-XXX',
      role: 'Admin',
      joinedDate: dev.joinedDate || 'N/A',
      techStacks: dev.techStacks || [],
      languagePreference: 'English',
      passwordLastUpdated: dev.passwordLastUpdated || 'N/A',
    };
  },

  uploadAvatar: async (file: File, userId: number): Promise<string> => {
    const formData = new FormData();
    formData.append('devProfileId', String(userId));
    formData.append('file', file);

    const response = await apiClient.patch(
      API_ENDPOINTS.UPLOAD_DEV_IMAGE,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data.data.url;
  },

  updateProfile: async (userId: number, data: ProfileFormValues) => {
    if (data.avatarFile) {
      await profileService.uploadAvatar(data.avatarFile, userId);
    }

    const payload = {
      name: data.name.trim(),
      github:
        data.socialAccounts.find((s) => s.platform === 'GitHub')?.url || '',
      linkedIn:
        data.socialAccounts.find((s) => s.platform === 'LinkedIn')?.url || '',
      telegramUsername:
        data.socialAccounts.find((s) => s.platform === 'Telegram')?.url || '',
      phone: data.phoneNumber,
      aboutDev: 'Updated profile',
      techStacks: data.techStacks,
    };

    const response = await apiClient.patch(
      `${API_ENDPOINTS.UPDATE_PROFILE}/${userId}`,
      payload,
    );

    return response.data;
  },
};
