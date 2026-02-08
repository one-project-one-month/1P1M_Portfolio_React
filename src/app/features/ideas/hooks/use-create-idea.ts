import { useToast } from '@/components/ui/toast-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { createProjectIdea } from '../../idea-management/services/project-idea.service';
import {
  createProjectIdeaSchema,
  type CreateProjectIdeaType,
  type ProjectIdeaCreateResponseType,
} from '../../idea-management/types/project-idea.types';

export const useCreateIdea = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const form = useForm<CreateProjectIdeaType>({
    resolver: zodResolver(createProjectIdeaSchema),
    defaultValues: {
      projectIdeaName: '',
      description: '',
      projectTypes: [],
    },
    mode: 'onSubmit',
  });

  const { mutate, isPending } = useMutation<
    ProjectIdeaCreateResponseType,
    AxiosError<{ message: string }>,
    { formData: CreateProjectIdeaType }
  >({
    mutationFn: ({ formData }: { formData: CreateProjectIdeaType }) =>
      createProjectIdea(formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      addToast(success.message, 'success');
      form.reset();
      onSuccess?.();
    },
    onError: (error) => addToast(error.message, 'error'),
  });

  const handleCreate: SubmitHandler<CreateProjectIdeaType> = (formData) =>
    mutate({ formData });

  return {
    form,
    handleCreate,
    isPending,
  };
};
