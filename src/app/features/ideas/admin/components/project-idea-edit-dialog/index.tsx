import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import {
  editIdeaSchema,
  type EditIdeaType,
  type IdeaEditFormPropsType,
  type Step,
} from '../../../shared/types/project-idea.types';
import EditStep1 from './edit-step-1';
import EditStep2 from './edit-step-2';
import EditStep3 from './edit-step-3';
import { useProjectIdeaMutations } from './hooks/use-project-idea-mutations';
import Stepper from './stepper';
import { handleAdminSubmit, handleClientSubmit } from './utils/form-handlers';

export default function ProjectIdeaEditDialog({
  trigger,
  data,
  open: controlledOpen,
  onOpenChange,
  clientMode = false,
}: IdeaEditFormPropsType) {
  const [step, setStep] = useState<Step>(0);
  const [internalOpen, setInternalOpen] = useState(false);

  const {
    updateInformationMutation,
    updateStatusMutation,
    assignLeaderMutation,
    invalidateIdeas,
    addToast,
  } = useProjectIdeaMutations();

  // State for storing step data (admin mode only)
  const [step1Data, setStep1Data] = useState<{
    projectIdeaName?: string;
    description?: string;
    projectTypes?: string[];
  }>({});
  const [step2Data, setStep2Data] = useState<{
    dev_id?: number | null;
  }>({});

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const form = useForm<Partial<EditIdeaType>>({
    resolver: zodResolver(editIdeaSchema.partial()) as Resolver<
      Partial<EditIdeaType>
    >,
    defaultValues: {
      dev_id: data.dev_id ?? null,
      projectIdeaName: data.projectIdeaName ?? '',
      description: data.description ?? '',
      ownerProfilePicUrl: data.ownerProfilePicUrl ?? '',
      devUsername: data.devUsername ?? '',
      projectTypes: data?.projectTypes ?? [],
      status: data?.status ?? 'PENDING',
    },
    mode: 'onSubmit',
  });

  const goNext = useCallback(async () => {
    // Admin mode: step 0 is info, step 1 is leader, step 2 is status
    if (step === 0) {
      const ok = await form.trigger([
        'projectIdeaName',
        'description',
        'projectTypes',
      ]);
      if (!ok) return;

      // Save step 1 data to state
      const formValues = form.getValues();
      setStep1Data({
        projectIdeaName: formValues.projectIdeaName,
        description: formValues.description,
        projectTypes: formValues.projectTypes,
      });

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
    if (step === 2) {
      // Going back from step 2 to step 1: restore step2Data if it exists
      if (step2Data.dev_id !== undefined && step2Data.dev_id !== null) {
        form.setValue('dev_id', step2Data.dev_id);
      }
    } else if (step === 1) {
      // Going back from step 1 to step 0: restore step1Data if it exists
      if (step1Data.projectIdeaName) {
        form.setValue('projectIdeaName', step1Data.projectIdeaName);
      }
      if (step1Data.description) {
        form.setValue('description', step1Data.description);
      }
      if (step1Data.projectTypes) {
        form.setValue('projectTypes', step1Data.projectTypes);
      }
    }
    setStep((s) => (s === 0 ? 0 : ((s - 1) as Step)));
  }, [step, step1Data, step2Data, form]);

  // Admin mode: Submit all changes simultaneously
  const handleFinalSubmit = useCallback(
    async (formData: Partial<EditIdeaType>) => {
      if (!data.projectIdeaId) {
        addToast('Project idea ID is missing', 'error');
        return;
      }

      const status = formData.status;
      if (!status) {
        addToast('Please select a status', 'error');
        return;
      }

      const leaderId = step2Data.dev_id;
      if (!leaderId) {
        addToast('Please select a leader', 'error');
        return;
      }

      try {
        // Call all APIs simultaneously
        await handleAdminSubmit({
          projectIdeaId: data.projectIdeaId,
          status,
          devId: leaderId,
          step1Data,
          updateInformationAsync: updateInformationMutation.mutateAsync,
          assignLeaderAsync: assignLeaderMutation.mutateAsync,
          updateStatusAsync: updateStatusMutation.mutateAsync,
        });

        invalidateIdeas();
        addToast('Project idea updated successfully', 'success');
        setStep1Data({});
        setStep2Data({});
        setStep(0);
        form.reset();
        setOpen(false);
      } catch (error) {
        console.error('Error updating project idea:', error);
      }
    },
    [
      data.projectIdeaId,
      step1Data,
      step2Data,
      addToast,
      updateInformationMutation.mutateAsync,
      assignLeaderMutation.mutateAsync,
      updateStatusMutation.mutateAsync,
      invalidateIdeas,
      form,
      setOpen,
    ],
  );

  const handleStep2Next = useCallback(async () => {
    const ok = await form.trigger(['dev_id']);
    if (!ok) return;

    const leaderId = form.getValues('dev_id');
    if (!leaderId) {
      addToast('Please select a leader', 'error');
      return;
    }

    // Save step 2 data to state
    setStep2Data({ dev_id: leaderId });
    setStep(2);
  }, [form, addToast]);

  // Client mode: Update information only
  const onClientSubmit = useCallback(async () => {
    const ok = await form.trigger([
      'projectIdeaName',
      'description',
      'projectTypes',
    ]);
    if (!ok) return;

    const formValues = form.getValues();
    const formData = {
      projectIdeaName: formValues.projectIdeaName,
      description: formValues.description,
      projectTypes: formValues.projectTypes,
    };

    try {
      await handleClientSubmit({
        projectIdeaId: data.projectIdeaId,
        formData,
        updateInformationAsync: updateInformationMutation.mutateAsync,
      });

      invalidateIdeas();
      addToast('Project idea updated successfully', 'success');
      setStep(0);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error updating project idea:', error);
    }
  }, [
    form,
    data.projectIdeaId,
    addToast,
    setOpen,
    updateInformationMutation.mutateAsync,
    invalidateIdeas,
  ]);

  // Combined loading state
  const isPending =
    updateInformationMutation.isPending ||
    updateStatusMutation.isPending ||
    assignLeaderMutation.isPending;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          // Clear state data on close
          setStep1Data({});
          setStep2Data({});
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
        {!clientMode && <Stepper step={step} clientMode={clientMode} />}

        <form
          className="mt-10 flex flex-col gap-10"
          onSubmit={form.handleSubmit(handleFinalSubmit)}
        >
          {clientMode ? (
            /* Client mode: 1 step - info only */
            <>
              {step === 0 && <EditStep1 form={form} onNext={onClientSubmit} />}
            </>
          ) : (
            /* Admin mode: 3 steps - step 0 is info, step 1 is leader, step 2 is status */
            <>
              {step === 0 && <EditStep1 form={form} onNext={goNext} />}
              {step === 1 && (
                <EditStep2
                  form={form}
                  onBack={goBack}
                  onNext={handleStep2Next}
                  isPending={isPending}
                />
              )}
              {step === 2 && (
                <EditStep3 form={form} isPending={isPending} onBack={goBack} />
              )}
            </>
          )}
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
