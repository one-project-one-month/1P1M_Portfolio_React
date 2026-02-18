import { STATUS_COLORS } from '../constants/idea-filters.constants';

type ProjectIdeaStatus =
  | ''
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELETED';

export const truncateText = (text: string, max = 25): string => {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#6B7280';
};

export const formatStatus = (status: string): string => {
  return status.toLowerCase().replace('_', ' ');
};

export const changeProjectIdeaStatus = (status: ProjectIdeaStatus): string => {
  const STATUS_LABELS: Record<ProjectIdeaStatus, string> = {
    '': 'All',
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    IN_PROGRESS: 'In-progress',
    COMPLETED: 'Completed',
    DELETED: 'Deleted',
  };

  return STATUS_LABELS[status] || status;
};

export const changeProjectIdeaStatusBgColor = (
  status: ProjectIdeaStatus,
): string => {
  const STATUS_BG_COLORS: Record<ProjectIdeaStatus, string> = {
    '': '',
    PENDING: 'bg-[#FF8904]',
    APPROVED: 'bg-[#00A63E]',
    REJECTED: 'bg-[#EF4444]',
    IN_PROGRESS: 'bg-[#3B82F6]',
    COMPLETED: 'bg-[#10B981]',
    DELETED: 'bg-[#6B7280]',
  };

  return STATUS_BG_COLORS[status];
};
export const changeProjectIdeaStatusColor = (
  status: ProjectIdeaStatus,
): string => {
  const STATUS_BG_COLORS: Record<ProjectIdeaStatus, string> = {
    '': '',
    PENDING: 'text-[#FF8904]',
    APPROVED: 'text-[#00A63E]',
    REJECTED: 'text-[#EF4444]',
    IN_PROGRESS: 'text-[#3B82F6]',
    COMPLETED: 'text-[#10B981]',
    DELETED: 'text-[#6B7280]',
  };

  return STATUS_BG_COLORS[status];
};
