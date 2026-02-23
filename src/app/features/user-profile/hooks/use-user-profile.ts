import { useQuery } from '@tanstack/react-query';
import { getUserProfileService } from '../services/user-profile.service';
import type { UserProfileResponseType } from '../types/user-profile.type';

export const useGetUserProfile = (userId: number | string | undefined) => {
  return useQuery<UserProfileResponseType>({
    queryKey: ['user-profile', userId],
    queryFn: () => getUserProfileService({ userId: userId! }),
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });
};
