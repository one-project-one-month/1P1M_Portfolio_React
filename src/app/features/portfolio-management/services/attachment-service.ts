export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'file' | 'link';
  size?: number;
  uploadedAt: Date;
}

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    id: crypto.randomUUID(),
    name: file.name,
    url: URL.createObjectURL(file), // Mock URL - Backend will provide real URL
    type: 'file',
    size: file.size,
    uploadedAt: new Date(),
  };

  /* 
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/portfolio/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('File upload failed');
    }
    
    return await response.json();
    */
};

export const deleteFile = async (fileId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('Mock: File deleted', fileId);

  /*
    const response = await fetch(`/api/portfolio/upload/${fileId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('File deletion failed');
    }
    */
};

export const validateUrl = (url: string): UploadedFile | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return {
        id: crypto.randomUUID(),
        name: url,
        url: url,
        type: 'link',
        uploadedAt: new Date(),
      };
    }
    return null;
  } catch {
    return null;
  }
};
