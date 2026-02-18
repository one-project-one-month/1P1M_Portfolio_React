import {
  banUserService,
  editUserManagementService,
  getUserManagementService,
  getUserProfileDetail,
  restoreUserService,
} from '@/app/features/user-management/services/user-management.service';
import {
  type EditUserManagementType,
  type GetUserManagementParamsType,
  type UserManagementEditResponseType,
  type UserManagementResponseType,
  type UserProfileDetailResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { useToast } from '@/components/ui/toast-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetUserManagement = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
  status,
}: GetUserManagementParamsType) => {
  return useQuery<UserManagementResponseType>({
    queryKey: [
      'user-management',
      keyword,
      page,
      size,
      sortField,
      sortDirection,
      status,
    ],
    queryFn: () =>
      getUserManagementService({
        keyword,
        page,
        size,
        sortField,
        sortDirection,
      }),
  });
};

export const useEditUserManagement = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    UserManagementEditResponseType,
    AxiosError<{ message: string }>,
    { userId: number; formData: EditUserManagementType }
  >({
    mutationFn: ({ userId, formData }) =>
      editUserManagementService(userId, formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      addToast(response.message || 'User updated successfully', 'success');
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Failed to update user';
      addToast(errorMessage, 'error');
    },
  });
};

// export const useGetUserManagementDetail = (userId: number) => {
//   return useQuery<UserManagementDetailResponseType, AxiosError>({
//     queryKey: ['user-management-detail', userId],
//     queryFn: () => getUserManagementDetail(userId),
//     enabled: userId !== undefined && !isNaN(userId),
//   });
// };

export const useGetUserProfileDetail = (userId: number) => {
  return useQuery<UserProfileDetailResponseType, AxiosError>({
    queryKey: ['user-management-detail', userId],
    queryFn: () => getUserProfileDetail(userId),
    enabled: userId !== undefined && !isNaN(userId),
  });
};
export const useBanUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ userId, desc }: { userId: number; desc: string }) =>
      banUserService(userId, desc),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      addToast('User banned successfully', 'success');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.response?.data?.message || 'Failed to ban user', 'error');
    },
  });
};

export const useRestoreUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ userId }: { userId: number }) => restoreUserService(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      addToast('User banned successfully', 'success');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.response?.data?.message || 'Failed to ban user', 'error');
    },
  });
};
