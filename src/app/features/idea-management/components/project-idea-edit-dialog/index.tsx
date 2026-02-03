import { useToast } from '@/components/ui/toast-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { editProjectIdea } from '../../services/project-idea.service';
import {
  editProjectIdeaSchema,
  type EditProjectIdeaType,
  type ProjectIdeaEditFormPropsType,
  type ProjectIdeaEditResponseType,
  type Step,
} from '../../types/project-idea.types';
import EditStep1 from './edit-step-1';
import EditStep2 from './edit-step-2';
import EditStep3 from './edit-step-3';
import Stepper from './stepper';

export default function ProjectIdeaEditDialog({
  trigger,
  data,
  open: controlledOpen,
  onOpenChange,
}: ProjectIdeaEditFormPropsType & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>(0);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const form = useForm<Partial<EditProjectIdeaType>>({
    resolver: zodResolver(editProjectIdeaSchema.partial()) as Resolver<
      Partial<EditProjectIdeaType>
    >,
    defaultValues: {
      dev_id: data.dev_id ?? null,
      projectIdeaName: data.projectIdeaName ?? '',
      description: data.description ?? '',
      ownerProfilePicUrl: data.ownerProfilePicUrl ?? '',
      devName: data.devName ?? '',
      projectTypes: data?.projectTypes ?? [],
      status: data?.status ?? 'PENDING',
    },
    mode: 'onSubmit',
  });

  const goNext = useCallback(async () => {
    if (step === 0) {
      const ok = await form.trigger([
        'projectIdeaName',
        'description',
        'projectTypes',
      ]);
      if (!ok) return;
      setStep(1);
      return;
    }

    if (step === 1) {
      const ok = await form.trigger(['dev_id']);
      if (!ok) return;
      setStep(2);
    }
  }, [step, form]);

  const goBack = useCallback(() => {
    setStep((s) => (s === 0 ? 0 : ((s - 1) as Step)));
  }, []);

  const { mutate, isPending } = useMutation<
    ProjectIdeaEditResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: EditProjectIdeaType }
  >({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: EditProjectIdeaType;
    }) => editProjectIdea(id, formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(success.message, 'success');
      setStep(0);
      form.reset();
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });

  const handleFinalSubmit = (formData: Partial<EditProjectIdeaType>) => {
    if (!data.id) {
      addToast('Project idea ID is missing', 'error');
      return;
    }
    mutate({ id: data.id, formData: formData as EditProjectIdeaType });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setStep(0);
          form.reset();
        }
      }}
    >
      {controlledOpen === undefined && (
        <Dialog.Trigger>
          {trigger || <button type="button">Edit Idea</button>}
        </Dialog.Trigger>
      )}

      <Dialog.Content
        size="4"
        maxWidth="758px"
        className="bg-black! text-white px-16! py-12! rounded-3xl! max-h-[90vh] overflow-y-auto"
      >
        <Stepper step={step} />

        <form
          className="mt-10 flex flex-col gap-10"
          onSubmit={form.handleSubmit(handleFinalSubmit)}
        >
          {step === 0 && <EditStep1 form={form} onNext={goNext} />}
          {step === 1 && (
            <EditStep2 form={form} onBack={goBack} onNext={goNext} />
          )}
          {step === 2 && <EditStep3 form={form} isPending={isPending} />}
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
