import { type Status } from '@/app/features/user-management/types/project-idea-type';
export const statusColorList: Record<Status, string> = {
  PENDING: 'text-[#FD9A00]',
  APPROVED: 'text-[#7CCF00]',
  IN_PROGRESS: 'text-[#00B8DB]',
  COMPLETED: 'text-[#03fcdb]',
  REJECTED: 'text-[#9F0712]',
  DELETED: 'text-[#6A7282]',
};
