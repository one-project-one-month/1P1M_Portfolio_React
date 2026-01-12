export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const getAuthConfig = (additionalConfig: { headers?: object } = {}) => {
  return {
    ...additionalConfig,
    headers: {
      ...getAuthHeaders(),
      ...additionalConfig.headers,
    },
  };
};
