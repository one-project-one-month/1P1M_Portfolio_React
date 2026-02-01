import apiClient from '@/api/axios';

interface MediaUploadResponse {
  data: string;
}

export const uploadProjectImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<MediaUploadResponse>(
    '/portfolio/api/v1/media/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.data;
};
