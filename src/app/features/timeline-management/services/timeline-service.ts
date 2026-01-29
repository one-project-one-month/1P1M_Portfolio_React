import apiClient from '@/api/axios.ts';
import type { Timeline } from '@/app/features/timeline-management/services/types.ts';
import { API_ENDPOINTS } from '@/config/api.ts';

// export const getTimelineData = (): Timeline[] => {
//   return [
//     {
//       id: '1',
//       name: 'September Countdown',
//       startDate: '2025-09-01',
//       endDate: '2025-09-30',
//       status: 'Finished',
//       description: 'Final wrap-up and retrospective for the Q3 marketing push.',
//     },
//     {
//       id: '2',
//       name: 'Q1 Kickoff 2026',
//       startDate: '2026-01-01',
//       endDate: '2026-01-31',
//       status: 'Active',
//       description:
//         'Initial planning phase for the 2026 fiscal year objectives.',
//     },
//     {
//       id: '3',
//       name: 'Spring Product Launch',
//       startDate: '2026-03-15',
//       endDate: '2026-04-15',
//       status: 'Upcoming',
//       description: 'New feature rollout for the mobile application suite.',
//     },
//     {
//       id: '4',
//       name: 'Annual Brand Audit',
//       startDate: '2025-11-10',
//       endDate: '2025-12-20',
//       status: 'Finished',
//       description: 'Comprehensive review of brand assets and guidelines.',
//     },
//     {
//       id: '5',
//       name: 'Winter Holiday Promo',
//       startDate: '2025-12-15',
//       endDate: '2026-01-05',
//       status: 'Finished',
//       description: 'Seasonal promotion targeting end-of-year sales growth.',
//     },
//   ];
// };

export const getTimelineData = async (): Promise<Timeline[]> => {
  try {
    const response = await apiClient.get<Timeline[]>(
      API_ENDPOINTS.GET_ALL_TIMELINES,
    );

    console.log('API Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Timeline API Error:', error);
    throw error;
  }
};
