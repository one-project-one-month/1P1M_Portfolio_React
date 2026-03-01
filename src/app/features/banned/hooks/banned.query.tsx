import { useQuery } from '@tanstack/react-query';
import { getUserBanStatus } from '../services/banned.service';

export const useBanStatusQuery = (userId?: string) => {
  return useQuery({
    queryKey: ['ban-status', userId],
    queryFn: () => getUserBanStatus(userId!),
    enabled: !!userId, // prevents request if undefined
    staleTime: 1000 * 60 * 5, // 5 mins cache
  });
};
