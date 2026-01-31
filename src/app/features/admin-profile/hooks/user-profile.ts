import { profileService } from '@/app/features/admin-profile/services/profile-service.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  MOCK_USER_DATA,
  type ProfileFormValues,
  ProfileSchema,
} from '../types';

export const useProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: MOCK_USER_DATA,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialAccounts',
  });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    form.reset(MOCK_USER_DATA);
    setIsEditing(false);
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    await profileService.updateProfile(data);
    console.log('Submitted Payload:', data);
    setIsLoading(false);
    setIsEditing(false);
    alert('Profile Updated Successfully!');
  });

  return {
    form,
    fields,
    append,
    remove,
    isEditing,
    isLoading,
    handleEdit,
    handleCancel,
    handleSubmit,
  };
};
