import { getUserManagement } from '@/app/features/user-management/services/user-management.service';
import type {
  GetUserManagementParamsType,
  UserManagementResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { useQuery } from '@tanstack/react-query';

export const useGetUserManagement = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetUserManagementParamsType) => {
  return useQuery<UserManagementResponseType>({
    queryKey: [
      'user-management',
      keyword,
      page,
      sortDirection,
      sortField,
      size,
    ],
    queryFn: () =>
      getUserManagement({ keyword, page, size, sortDirection, sortField }),
  });
};
