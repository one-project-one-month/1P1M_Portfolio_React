import apiClient from '@/api/axios';

interface MediaUploadResponse {
  success: number;
  code: number;
  meta: {
    endpoint: string;
    method: string;
  };
  data: string;
  message: string;
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
