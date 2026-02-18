import { TechStacks } from '@/constants';

export const truncate = (text: string, max = 45): string => {
  return text.length > max ? text.slice(0, max) + '...' : text;
};

export const normalizeTechStack = (value: string) => {
  const matched = TechStacks.find(
    (item) =>
      item.value.toLowerCase() === value.toLowerCase() ||
      item.name.toLowerCase() === value.toLowerCase(),
  );
  return matched?.value ?? value;
};

export const getTechStackLabel = (value: string) => {
  const matched = TechStacks.find(
    (item) => item.value.toLowerCase() === value.toLowerCase(),
  );
  return matched?.name ?? value;
};
