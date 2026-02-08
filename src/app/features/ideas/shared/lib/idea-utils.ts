import { STATUS_COLORS } from '../constants/idea-filters.constants';

type ProjectIdeaStatus =
  | ''
  | 'PENDING'
  | 'APPROVED'
  | 'ARCHIVED'
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
    PENDING: 'In progress',
    APPROVED: 'Approved',
    ARCHIVED: 'Archived',
    REJECTED: 'Rejected',
    IN_PROGRESS: 'In-progress',
    COMPLETED: 'Completed',
    DELETED: 'Deleted',
  };

  return STATUS_LABELS[status] || status;
};

export const changeProjectIdeaStatusColor = (
  status: ProjectIdeaStatus,
): string => {
  const STATUS_BG_COLORS: Record<ProjectIdeaStatus, string> = {
    '': '',
    PENDING: 'bg-[#FF8904]',
    APPROVED: 'bg-[#00A63E]',
    ARCHIVED: 'bg-[#A6A09B]',
    REJECTED: 'bg-[#A6A09B]',
    IN_PROGRESS: 'bg-[#A6A09B]',
    COMPLETED: 'bg-[#A6A09B]',
    DELETED: 'bg-[#A6A09B]',
  };

  return STATUS_BG_COLORS[status] || 'bg-[#A6A09B]';
};
