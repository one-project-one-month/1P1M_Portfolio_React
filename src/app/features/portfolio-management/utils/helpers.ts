import type { Member } from '../constants/data';

export const getMemberCount = (members: Member[]): number => members.length;

export const getDisplayMembers = (members: Member[], limit: number = 3) => {
  const displayMembers = members.slice(0, limit);
  const remainingCount = Math.max(0, members.length - limit);

  return {
    displayMembers,
    remainingCount,
  };
};
