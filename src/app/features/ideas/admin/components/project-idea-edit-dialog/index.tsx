import { useToast } from '@/components/ui/toast-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import {
  assignProjectLeader,
  updateProjectIdeaInformation,
  updateProjectIdeaStatus,
} from '../../../shared/services/project-idea.service';
import {
  editIdeaSchema,
  type EditIdeaType,
  type IdeaEditFormPropsType,
  type Step,
} from '../../../shared/types/project-idea.types';
import EditStep1 from './edit-step-1';
import EditStep2 from './edit-step-2';
import EditStep3 from './edit-step-3';
import Stepper from './stepper';

export default function ProjectIdeaEditDialog({
  trigger,
  data,
  open: controlledOpen,
  onOpenChange,
  clientMode = false,
}: IdeaEditFormPropsType) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>(0);
  const [internalOpen, setInternalOpen] = useState(false);

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
      devName: data.devName ?? '',
      projectTypes: data?.projectTypes ?? [],
      status: data?.status ?? 'PENDING',
    },
    mode: 'onSubmit',
  });

  // Save step 1 (Information) data to localStorage when it changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name &&
        ['projectIdeaName', 'description', 'projectTypes'].includes(name)
      ) {
        const storageKey = `projectIdea_${data.projectIdeaId}_step1`;
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            projectIdeaName: value.projectIdeaName,
            description: value.description,
            projectTypes: value.projectTypes,
          }),
        );
      }

      // Save step 2 (Leader) data to localStorage when dev_id changes
      if (name === 'dev_id') {
        const storageKey = `projectIdea_${data.projectIdeaId}_step2`;
        localStorage.setItem(
          storageKey,
          JSON.stringify({ dev_id: value.dev_id }),
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form, data.projectIdeaId]);

  const goNext = useCallback(async () => {
    // Admin mode: step 0 is info, step 1 is leader, step 2 is status
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

  const { mutate: updateInformation, isPending: isUpdatingInfo } = useMutation({
    mutationFn: ({
      projectIdeaId,
      formData,
    }: {
      projectIdeaId: number;
      formData: Partial<EditIdeaType>;
    }) => updateProjectIdeaInformation(projectIdeaId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      addToast('Information updated successfully', 'success');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.message || 'Failed to update information', 'error');
    },
  });

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({
      projectIdeaId,
      status,
    }: {
      projectIdeaId: number;
      status: EditIdeaType['status'];
    }) => updateProjectIdeaStatus(projectIdeaId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      addToast('Project idea updated successfully', 'success');
      // Clear all localStorage keys
      const storageKeyStep1 = `projectIdea_${data.projectIdeaId}_step1`;
      const storageKeyStep2 = `projectIdea_${data.projectIdeaId}_step2`;
      localStorage.removeItem(storageKeyStep1);
      localStorage.removeItem(storageKeyStep2);
      setStep(0);
      form.reset();
      setOpen(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.message || 'Failed to update status', 'error');
    },
  });

  const { mutate: assignLeader, isPending: isAssigningLeader } = useMutation({
    mutationFn: ({
      projectIdeaId,
      leaderId,
    }: {
      projectIdeaId: number;
      leaderId: number;
    }) => assignProjectLeader(projectIdeaId, leaderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      addToast('Leader assigned successfully', 'success');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      addToast(error.message || 'Failed to assign leader', 'error');
    },
  });

  const handleFinalSubmit = useCallback(
    (formData: Partial<EditIdeaType>) => {
      if (!data.projectIdeaId) {
        addToast('Project idea ID is missing', 'error');
        return;
      }

      // Admin mode - update information, assign leader, then update status (Step 3)
      const status = formData.status;
      if (!status) {
        addToast('Please select a status', 'error');
        return;
      }

      // Read leader ID from localStorage (saved in step 2)
      const storageKeyStep2 = `projectIdea_${data.projectIdeaId}_step2`;
      const savedLeaderData = localStorage.getItem(storageKeyStep2);
      let leaderId: number | null = null;

      if (savedLeaderData) {
        try {
          const parsedLeaderData = JSON.parse(savedLeaderData);
          leaderId = parsedLeaderData.dev_id;
        } catch (error) {
          console.error('Failed to parse leader data:', error);
        }
      }

      if (!leaderId) {
        addToast('Please select a leader', 'error');
        return;
      }

      const storageKey = `projectIdea_${data.projectIdeaId}_step1`;
      const savedData = localStorage.getItem(storageKey);

      // Step 1: Update information (if changed)
      const updateInfoAndContinue = () => {
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            updateInformation(
              {
                projectIdeaId: data.projectIdeaId,
                formData: parsedData,
              },
              {
                onSuccess: () => {
                  // Step 2: Assign leader
                  assignLeader(
                    {
                      projectIdeaId: data.projectIdeaId,
                      leaderId: leaderId,
                    },
                    {
                      onSuccess: () => {
                        // Step 3: Update status
                        updateStatus({
                          projectIdeaId: data.projectIdeaId,
                          status,
                        });
                      },
                      onError: () => {
                        addToast('Failed to assign leader', 'error');
                      },
                    },
                  );
                },
                onError: () => {
                  addToast('Failed to update information', 'error');
                },
              },
            );
          } catch (error) {
            console.error('Failed to parse saved data:', error);
            addToast('Failed to parse saved information', 'error');
          }
        } else {
          // No info changes, just assign leader then update status
          assignLeader(
            {
              projectIdeaId: data.projectIdeaId,
              leaderId: leaderId,
            },
            {
              onSuccess: () => {
                // Update status after leader assigned
                updateStatus({
                  projectIdeaId: data.projectIdeaId,
                  status,
                });
              },
              onError: () => {
                addToast('Failed to assign leader', 'error');
              },
            },
          );
        }
      };

      updateInfoAndContinue();
    },
    [
      data.projectIdeaId,
      addToast,
      updateStatus,
      updateInformation,
      assignLeader,
    ],
  );

  const handleStep2Next = useCallback(async () => {
    // Validate leader selection
    const ok = await form.trigger(['dev_id']);
    if (!ok) return;

    const leaderId = form.getValues('dev_id');
    if (!leaderId) {
      addToast('Please select a leader', 'error');
      return;
    }

    // Admin mode: Just move to next step (status), don't call APIs yet
    setStep(2);
  }, [form, addToast]);

  // Client mode: Only update information and close
  const handleClientSubmit = useCallback(async () => {
    // Validate information fields
    const ok = await form.trigger([
      'projectIdeaName',
      'description',
      'projectTypes',
    ]);
    if (!ok) return;

    const storageKey = `projectIdea_${data.projectIdeaId}_step1`;
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        updateInformation(
          {
            projectIdeaId: data.projectIdeaId,
            formData: parsedData,
          },
          {
            onSuccess: () => {
              addToast('Project idea updated successfully', 'success');
              localStorage.removeItem(storageKey);
              setStep(0);
              form.reset();
              setOpen(false);
            },
            onError: () => {
              addToast('Failed to update information', 'error');
            },
          },
        );
      } catch (error) {
        console.error('Failed to parse saved data:', error);
        addToast('Failed to parse saved information', 'error');
      }
    } else {
      addToast('No changes detected', 'info');
      setOpen(false);
    }
  }, [form, updateInformation, data.projectIdeaId, addToast, setOpen]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          // Clear localStorage on close
          const storageKeyStep1 = `projectIdea_${data.projectIdeaId}_step1`;
          const storageKeyStep2 = `projectIdea_${data.projectIdeaId}_step2`;
          localStorage.removeItem(storageKeyStep1);
          localStorage.removeItem(storageKeyStep2);
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
        <Stepper step={step} clientMode={clientMode} />

        <form
          className="mt-10 flex flex-col gap-10"
          onSubmit={form.handleSubmit(handleFinalSubmit)}
        >
          {clientMode ? (
            /* Client mode: 1 step - info only */
            <>
              {step === 0 && (
                <EditStep1 form={form} onNext={handleClientSubmit} />
              )}
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
                  isPending={isUpdatingInfo || isAssigningLeader}
                />
              )}
              {step === 2 && (
                <EditStep3 form={form} isPending={isUpdatingStatus} />
              )}
            </>
          )}
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
