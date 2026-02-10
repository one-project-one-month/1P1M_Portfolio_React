import { getDevProfiles } from '@/app/features/developers/services/dev-profile-service';
import type { GetDevProfiles } from '@/types/dev';
import { useQuery } from '@tanstack/react-query';

export const useGetDevelopers = () => {
  return useQuery<GetDevProfiles>({
    queryKey: ['developers'],
    queryFn: () => getDevProfiles({ page: 0, size: 100 }),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
