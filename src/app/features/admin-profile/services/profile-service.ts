import apiClient from '@/api/axios.ts';
import { API_ENDPOINTS } from '@/config/api.ts';
import { userId } from '@/store/user-info-store';
import { type ProfileFormValues } from '../services/types';

export const profileService = {
  getProfile: async (userId: number): Promise<ProfileFormValues> => {
    const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE_DATA, {
      params: { userId },
    });

    const dev = response.data.data.devProfile;

    return {
      firstName: dev.name.split(' ')[0] || '',
      lastName: dev.name.split(' ').slice(1).join(' ') || '',
      email: dev.email,
      avatarUrl: dev.profilePictureUrl || 'https://i.pravatar.cc/300',
      socialAccounts: [
        ...(dev.github ? [{ platform: 'GitHub', url: dev.github }] : []),
        ...(dev.linkedIn ? [{ platform: 'LinkedIn', url: dev.linkedIn }] : []),
      ],
      phoneNumber: '+95-95000000',
      role: 'Admin',
      joinedDate: 'N/A',
      languagePreference: 'English',
      passwordLastUpdated: 'N/A',
    };
  },

  uploadAvatar: async (file: File): Promise<string> => {
    //TODO: we need to refactor how we get userID

    const formData = new FormData();
    formData.append('devProfileId', userId);
    formData.append('file', file);

    const response = await apiClient.patch(
      API_ENDPOINTS.UPLOAD_DEV_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.data.url;
  },

  updateProfile: async (userId: number, data: ProfileFormValues) => {
    let finalAvatarUrl = data.avatarUrl;

    if (data.avatarFile) {
      finalAvatarUrl = await profileService.uploadAvatar(data.avatarFile);
    }

    const payload = {
      dev_id: userId,
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      github:
        data.socialAccounts.find((s) => s.platform === 'GitHub')?.url || '',
      linkedIn:
        data.socialAccounts.find((s) => s.platform === 'LinkedIn')?.url || '',
      profilePictureUrl: finalAvatarUrl,
      aboutDev: 'Updated profile info',
    };

    const response = await apiClient.put(
      `${API_ENDPOINTS.UPDATE_PROFILE}/${userId}`,
      payload,
    );

    return response.data;
  },
};
