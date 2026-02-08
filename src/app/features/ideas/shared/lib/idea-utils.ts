export const truncateText = (text: string, max = 25): string => {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

export const getStatusColor = (status: string): string => {
  const STATUS_COLORS: Record<string, string> = {
    APPROVED: '#7CCF00',
    PENDING: '#FD9A00',
    ARCHIVED: '#A6A09B',
    REJECTED: '#EF4444',
    IN_PROGRESS: '#3B82F6',
    COMPLETED: '#10B981',
    DELETED: '#6B7280',
  };

  return STATUS_COLORS[status] || '#6B7280';
};

export const formatStatus = (status: string): string => {
  return status.toLowerCase().replace('_', ' ');
};
