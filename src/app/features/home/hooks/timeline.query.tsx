import type { TimelineResponse } from '@/types/timeline.type';
import { useQuery } from '@tanstack/react-query';
import { getLatestTimeline } from '../services/timeline.service';

export const useGetLatestTimeline = () => {
  return useQuery<TimelineResponse>({
    queryKey: ['latestTimeline'],
    queryFn: getLatestTimeline,
  });
};
