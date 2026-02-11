import { useToast } from '@/components/ui/toast-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { createProjectIdea } from '../services/project-idea.service';
import {
  createIdeaSchema,
  type CreateIdeaType,
  type IdeaCreateResponseType,
} from '../types/project-idea.types';

export const useCreateIdea = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const form = useForm<CreateIdeaType>({
    resolver: zodResolver(createIdeaSchema),
    defaultValues: {
      projectIdeaName: '',
      description: '',
      projectTypes: [],
    },
    mode: 'onSubmit',
  });

  const { mutate, isPending } = useMutation<
    IdeaCreateResponseType,
    AxiosError<{ message: string }>,
    { formData: CreateIdeaType }
  >({
    mutationFn: ({ formData }: { formData: CreateIdeaType }) =>
      createProjectIdea(formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      addToast(success.message, 'success');
      form.reset();
      onSuccess?.();
    },
    onError: (error) => addToast(error.message, 'error'),
  });

  const handleCreate: SubmitHandler<CreateIdeaType> = (formData) =>
    mutate({ formData });

  return {
    form,
    handleCreate,
    isPending,
  };
};
