import type { Timeline } from '@/app/features/timeline-management/types.ts';

export const getTimelineData = (): Timeline[] => {
  return [
    {
      id: '1',
      name: 'September Countdown',
      startDate: '2025-09-01',
      endDate: '2025-09-30',
      status: 'Finished',
    },
    {
      id: '2',
      name: 'Q1 Kickoff 2026',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Spring Product Launch',
      startDate: '2026-03-15',
      endDate: '2026-04-15',
      status: 'Upcoming',
    },
    {
      id: '4',
      name: 'Annual Brand Audit',
      startDate: '2025-11-10',
      endDate: '2025-12-20',
      status: 'Finished',
    },
    {
      id: '5',
      name: 'Winter Holiday Promo',
      startDate: '2025-12-15',
      endDate: '2026-01-05',
      status: 'Finished',
    },
  ];
};
