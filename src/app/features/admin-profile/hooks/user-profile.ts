import { profileService } from '@/app/features/admin-profile/services/profile-service.ts';
import { useToast } from '@/components/ui/toast-provider.tsx';
import { useUserInfoStore } from '@/store/user-info-store.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { type ProfileFormValues, ProfileSchema } from '../services/types.ts';

export const useProfile = (userId: number | null) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const user = useUserInfoStore((state) => state.userInfo);
  const userID = user?.userId ? parseInt(String(user.userId)) : null;

  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileService.getProfile(userId as number),
    enabled: typeof userId === 'number' && !isNaN(userId) && userId > 0,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    values: data,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialAccounts',
  });

  const mutation = useMutation({
    mutationFn: (payload: ProfileFormValues) => {
      if (!userID) throw new Error('User ID is missing');
      return profileService.updateProfile(userID, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile', userID] });
      setIsEditing(false);
      addToast('Profile Updated Successfully!', 'success');
    },
    onError: (error) => {
      console.error('Update failed:', error);
      // Optional: Add an error toast here
      addToast('Failed to update profile.', 'error');
    },
  });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);

    mutation.mutate(values);
  });

  return {
    form,
    fields,
    append,
    remove,
    isEditing,
    isLoading: isFetching || mutation.isPending,
    isSaving: mutation.isPending,
    handleEdit,
    handleCancel,
    handleSubmit: onSubmit,
  };
};
