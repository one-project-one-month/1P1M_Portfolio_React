export const ORDER_OPTIONS = ['newest', 'oldest', 'popular'];

export const FILTER_OPTIONS = [
  { name: 'ALL', value: '' },
  { name: 'Pending', value: 'PENDING' },
  { name: 'Approved', value: 'APPROVED' },
  { name: 'In-progress', value: 'IN_PROGRESS' },
  { name: 'Completed', value: 'COMPLETED' },
  { name: 'Rejected', value: 'REJECTED' },
  { name: 'Deleted', value: 'DELETED' },
];

export const ORDER_LIST = [
  { value: 'newest', name: 'Newest' },
  { value: 'oldest', name: 'Oldest' },
  { value: 'popular', name: 'Popular' },
];

export const STATUS_COLORS = {
  APPROVED: '#7CCF00',
  PENDING: '#FD9A00',
  ARCHIVED: '#A6A09B',
  REJECTED: '#EF4444',
  IN_PROGRESS: '#3B82F6',
  COMPLETED: '#10B981',
  DELETED: '#6B7280',
};
