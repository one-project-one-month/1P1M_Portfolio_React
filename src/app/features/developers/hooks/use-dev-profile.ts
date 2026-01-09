import type { GetDevProfilesParams } from '@/types/dev';
import { useQuery } from '@tanstack/react-query';
import { newGetDevProfiles } from '../services/dev-profile-service';

export const useDevProfile = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetDevProfilesParams) => {
  return useQuery({
    queryKey: ['devProfiles', keyword, page, sortDirection, sortField, size],
    queryFn: () =>
      newGetDevProfiles({ keyword, page, size, sortDirection, sortField }),
  });
};
