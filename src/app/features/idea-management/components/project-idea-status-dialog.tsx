import { useToast } from '@/components/ui/toast-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { updateProjectIdeaStatus } from '../services/project-idea.service';
import {
  updateProjectIdeaStatusSchema,
  type ProjectIdeaStatusUpdateResponseType,
  type UpdateProjectIdeaStatusType,
} from '../types/project-idea.types';
import ProjectIdeaStatus from './project-idea-status';

function ProjectIdeaStatusDialog({
  data,
  trigger,
}: {
  data: { id: number; status: 'PENDING' | 'APPROVED' | 'ARCHIVED' };
  trigger?: ReactNode;
}) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateProjectIdeaStatusType>({
    resolver: zodResolver(updateProjectIdeaStatusSchema),
    defaultValues: {
      status: data.status,
    },
  });

  const { mutate: updateStatusMutate, isPending: updateStatusPending } =
    useMutation<
      ProjectIdeaStatusUpdateResponseType,
      AxiosError<{ message: string }>,
      { id: number; formData: UpdateProjectIdeaStatusType }
    >({
      mutationFn: ({
        id,
        formData,
      }: {
        id: number;
        formData: UpdateProjectIdeaStatusType;
      }) => updateProjectIdeaStatus(id, formData),
      onSuccess: (success) => {
        queryClient.invalidateQueries({ queryKey: ['project-idea'] });
        addToast(success.message, 'success');
        setOpen(false);
      },
      onError: (error) => {
        setOpen(false);
        addToast(error.message, 'error');
      },
    });

  const handleStatusUpdate = (formData: UpdateProjectIdeaStatusType) => {
    if (!data.id) {
      addToast('Project idea ID is missing', 'error');
      return;
    }
    updateStatusMutate({
      id: data.id,
      formData: formData as UpdateProjectIdeaStatusType,
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger || <>View Status</>}</Dialog.Trigger>
      <Dialog.Content
        size="4"
        maxWidth="758px"
        className="bg-black! text-white px-16! py-12! rounded-3xl!"
      >
        <form onSubmit={form.handleSubmit(handleStatusUpdate)}>
          <ProjectIdeaStatus
            type="status-change-form"
            statusChangeForm={form}
            isPending={updateStatusPending}
          />
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ProjectIdeaStatusDialog;
