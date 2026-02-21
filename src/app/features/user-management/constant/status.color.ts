import { type Status } from '@/app/features/user-management/types/project-idea-type';
export const statusColorList: Record<Status, string> = {
  PENDING: 'text-[#E17100]',
  APPROVED: 'text-[#00C951]',
  IN_PROGRESS: 'text-[#E17100]',
  COMPLETED: 'text-[#00C951]',
  REJECTED: 'text-[#FB2C36]',
  DELETED: 'text-[#FB2C36]',
};
