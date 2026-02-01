import {
  banUserManagement,
  editUserManagement,
  getUserManagement,
  getUserManagementDetailById,
} from '@/app/features/user-management/services/user-management.service';
import type {
  EditUserManagementType,
  GetUserManagementParamsType,
  UserManagementResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useGetUserManagementDetail = (id: number) => {
  return useQuery({
    queryKey: ['user-management-detail', id],
    queryFn: () => getUserManagementDetailById(id),
    enabled: !!id,
  });
};

export const useEditUserManagement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: EditUserManagementType }) =>
      editUserManagement(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      console.log('User updated successfully');
    },

    onError: (error) => {
      console.error('Updated failed:', error);
    },
  });
};

export const useBanUserManagement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, desc }: { id: number; desc: string }) =>
      banUserManagement(id, desc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      console.log('User ban successfully');
    },
    onError: (error) => {
      console.error('Ban failed:', error);
    },
  });
};
