import { profileService } from '@/app/features/admin-profile/services/profile-service.ts';
import { useToast } from '@/components/ui/toast-provider.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { type ProfileFormValues, ProfileSchema } from '../services/types.ts';

export const useProfile = (userId: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const addToast = useToast();

  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileService.getProfile(userId),
    enabled: !!userId && !!localStorage.getItem('user'),
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
    mutationFn: (payload: ProfileFormValues) =>
      profileService.updateProfile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      setIsEditing(false);
      addToast('Profile Updated Successfully!', 'success');
    },
    onError: (error) => {
      console.error('Update failed:', error);
    },
  });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const onSubmit = form.handleSubmit((values) => {
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
