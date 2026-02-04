import { getUserManagementService } from '@/app/features/user-management/services/user-management.service';
import type {
  GetUserManagementParamsType,
  UserManagementResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { useQuery } from '@tanstack/react-query';

export const useGetUserManagement = ({
  keyword,
  page,
  size,
  status,
  sortDirection,
}: GetUserManagementParamsType) => {
  return useQuery<UserManagementResponseType>({
    queryKey: ['user-management', keyword, page, size, status, sortDirection],
    queryFn: () =>
      getUserManagementService({ keyword, page, size, status, sortDirection }),
  });
};
