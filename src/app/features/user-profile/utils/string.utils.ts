export const truncate = (text: string, max = 45): string => {
  return text.length > max ? text.slice(0, max) + '...' : text;
};
