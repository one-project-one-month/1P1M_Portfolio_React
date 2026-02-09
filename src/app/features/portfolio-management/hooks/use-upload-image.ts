import { useMutation } from '@tanstack/react-query';
import { uploadProjectImage } from '../services/image-upload-service';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadProjectImage,
  });
};
