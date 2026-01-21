import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormBackground from '@/components/ui/form-bg';

import EditStep1 from './edit-step-1';
import EditStep2 from './edit-step-2';
import EditStep3 from './edit-step-3';
import Stepper from './stepper';

import type {
  IdeaEditFormProps,
  Leader,
  Step,
} from '../../types/project-idea.types';

const MOCK_LEADERS: Leader[] = [
  {
    id: 1,
    name: 'Bora',
    email: 'Bora54@gmail.com',
    role: 'Backend',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    name: 'Tina',
    email: 'Tina@gmail.com',
    role: 'UI | UX Designer',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 3,
    name: 'Tina',
    email: 'Tina@gmail.com',
    role: 'Frontend',
    avatarUrl: 'https://i.pravatar.cc/150?img=45',
  },
];

export default function ProjectIdeaEditDialog({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  availableLeaders = MOCK_LEADERS,
}: IdeaEditFormProps) {
  const [step, setStep] = useState<Step>(0);

  const form = useForm({
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    form.reset(initialValues);
  }, [isOpen, initialValues, form]);

  const goNext = async () => {
    if (step === 0) {
      const ok = await form.trigger([
        'projectName',
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
  };

  const goBack = () => {
    setStep((s) => (s === 0 ? 0 : ((s - 1) as Step)));
  };

  const handleFinalSubmit = (values: any) => {
    onSubmit?.(values);
    setStep(0);
    form.reset(initialValues);
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setStep(0);
          form.reset(initialValues);
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 outline-none">
          <FormBackground className="relative w-full rounded-3xl px-10 py-10 text-white shadow-2xl">
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-6 top-6 rounded-md p-2 text-[#9CA3AF] hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <Stepper step={step} />

            <form
              className="mt-10 flex flex-col gap-10"
              onSubmit={form.handleSubmit(handleFinalSubmit)}
            >
              {step === 0 && (
                <EditStep1 form={form} onClose={onClose} onNext={goNext} />
              )}
              {step === 1 && (
                <EditStep2
                  form={form}
                  leaders={availableLeaders}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 2 && <EditStep3 form={form} onClose={onClose} />}
            </form>
          </FormBackground>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
