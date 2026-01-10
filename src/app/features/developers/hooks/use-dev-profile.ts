import type { GetDevProfilesParams } from '@/types/dev';
import { useQuery } from '@tanstack/react-query';
import { getDevProfiles } from '../services/dev-profile-service';

export const useDevProfileQuery = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetDevProfilesParams) => {
  return useQuery({
    queryKey: ['devProfiles', keyword, page, sortDirection, sortField, size],
    queryFn: () =>
      getDevProfiles({ keyword, page, size, sortDirection, sortField }),
  });
};
