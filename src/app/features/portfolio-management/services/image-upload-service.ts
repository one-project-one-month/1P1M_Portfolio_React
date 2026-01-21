export const uploadProjectImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock URL generation - this will change when we integrate with backend
      const mockUrl = URL.createObjectURL(file);
      resolve(mockUrl);
    }, 1000); // Simulate network delay
  });
};
