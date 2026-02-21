import type { ProjectPortfolioStatus } from '@/app/features/user-management/types/project-portfolio-type';

export const statusColorList: Record<ProjectPortfolioStatus, string> = {
  PENDING: 'text-[#E17100]',
  IN_PROGRESS: 'text-[#E17100]',
  PLANNING: 'text-[#155DFC]',
  COMPLETED: 'text-[#00C951]',
  UNQUALIFIED: 'text-[#A6A09B]',
};

export const statusBgList: Record<ProjectPortfolioStatus, string> = {
  PENDING: 'bg-[#E17100]',
  IN_PROGRESS: 'bg-[#E17100]',
  PLANNING: 'bg-[#155DFC]',
  COMPLETED: 'bg-[#00C951]',
  UNQUALIFIED: 'bg-[#A6A09B]',
};
