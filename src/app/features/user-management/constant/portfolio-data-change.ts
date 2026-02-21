export const portfolioStatusOptions = [
  {
    value: 'PENDING',
    label: 'Pending',
    description: 'This project is in the pending phase.',
  },
  {
    value: 'PLANNING',
    label: 'Planning',
    description: 'This project is in the planning phase.',
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    description: 'This project is currently being worked on.',
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    description: 'This project has been successfully finished.',
  },
  {
    value: 'UNQUALIFIED',
    label: 'Unqualified',
    description: 'This project did not pass the review standards.',
  },
] as const;
