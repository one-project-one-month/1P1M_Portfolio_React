import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { PROJECT_TYPE_OPTIONS } from '@/constants';
import type {
  IdeaCreateFormProps,
  IdeaCreateFormValues,
} from '../types/project-idea.types';

// ---- Types you’ll actually want for edit ----
type Step = 0 | 1 | 2;
type IdeaStatus = 'Pending' | 'Approved' | 'Archived';

type Leader = {
  id: number;
  name: string;
  email: string;
  role: 'Backend' | 'Frontend' | 'UI | UX Designer';
  avatarUrl?: string;
};

type IdeaEditValues = IdeaCreateFormValues & {
  leaderId: number | null;
  status: IdeaStatus;
};

interface IdeaEditModalProps extends Omit<IdeaCreateFormProps, 'onSubmit'> {
  initialValues: IdeaEditValues;
  onSubmit?: (values: IdeaEditValues) => void;
  availableLeaders?: Leader[]; // pass from parent, otherwise uses mock
}

// ---- Mock leaders (swap with API data later) ----
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
  {
    id: 4,
    name: 'Tina',
    email: 'Tina@gmail.com',
    role: 'Backend',
    avatarUrl: 'https://i.pravatar.cc/150?img=58',
  },
  {
    id: 5,
    name: 'Jeff',
    email: 'Jeff23@gmail.com',
    role: 'Backend',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 6,
    name: 'Steve',
    email: 'Steve35@gmail.com',
    role: 'Backend',
    avatarUrl: 'https://i.pravatar.cc/150?img=21',
  },
];

export default function ProjectIdeaEditDialog({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  availableLeaders = MOCK_LEADERS,
}: IdeaEditModalProps) {
  const [step, setStep] = useState<Step>(0);
  const [leaderQuery, setLeaderQuery] = useState('');

  const form = useForm<IdeaEditValues>({
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  // Reset when modal opens/closes, keep it deterministic
  useEffect(() => {
    if (isOpen) {
      form.reset(initialValues);
      setStep(0);
      setLeaderQuery('');
    } else {
      form.reset(initialValues);
      setStep(0);
      setLeaderQuery('');
    }
  }, [isOpen, initialValues, form]);

  const header = useMemo(() => {
    if (step === 0)
      return {
        title: 'Update the idea information!',
        desc: 'Choose a status to reflect the current progress and next step of this idea.',
      };
    if (step === 1)
      return {
        title: '',
        desc: '',
      };
    return {
      title: 'Change the idea status!',
      desc: 'Choose a status to reflect the current progress and next step of this idea.',
    };
  }, [step]);

  const filteredLeaders = useMemo(() => {
    const q = leaderQuery.trim().toLowerCase();
    if (!q) return availableLeaders;
    return availableLeaders.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q),
    );
  }, [leaderQuery, availableLeaders]);

  async function goNext() {
    if (step === 0) {
      const ok = await form.trigger(['name', 'description', 'projectTypes']);
      if (!ok) return;
      setStep(1);
      return;
    }

    if (step === 1) {
      const ok = await form.trigger(['leaderId']);
      if (!ok) return;
      setStep(2);
      return;
    }
  }

  function goBack() {
    setStep((s) => (s === 0 ? 0 : ((s - 1) as Step)));
  }

  function handleFinalSubmit(values: IdeaEditValues) {
    onSubmit?.(values);
    onClose();
  }

  const currentLeader = useMemo(() => {
    const id = form.getValues('leaderId');
    return availableLeaders.find((l) => l.id === id) ?? null;
  }, [availableLeaders, form]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 outline-none">
          <FormBackground className="relative w-full rounded-3xl px-10 py-10 text-white shadow-2xl">
            {/* Close X (top-right) */}
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-6 top-6 rounded-md p-2 text-[#9CA3AF] hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            {/* Stepper */}
            <Stepper step={step} />

            {/* Step 01 header */}
            {step !== 1 && (
              <div className="mt-8">
                <Dialog.Title className="text-3xl font-semibold">
                  {header.title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-[#9CA3AF]">
                  {header.desc}
                </Dialog.Description>
              </div>
            )}

            <form
              className="mt-10 flex flex-col gap-10"
              onSubmit={form.handleSubmit(handleFinalSubmit)}
            >
              {/* =========================
                  STEP 01: INFORMATION
                  ========================= */}
              {step === 0 && (
                <div className="space-y-8">
                  <Controller
                    control={form.control}
                    name="name"
                    rules={{
                      required: 'Project idea name is required',
                      minLength: { value: 2, message: 'Minimum 2 characters' },
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Project idea Name
                        </label>
                        <InputField
                          type="text"
                          placeholder="Enter your project name"
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full"
                        />
                        {fieldState.error?.message && (
                          <p className="mt-2 text-sm font-bold text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="description"
                    rules={{
                      required: 'Description is required',
                      minLength: {
                        value: 10,
                        message: 'Minimum 10 characters',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Description
                        </label>
                        <FormTextArea
                          placeholder="Provide details about your project"
                          className="h-32 w-full"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {fieldState.error?.message && (
                          <p className="mt-2 text-sm font-bold text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="projectTypes"
                    rules={{
                      validate: (v) =>
                        v.length > 0
                          ? true
                          : 'Select at least one project type',
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <p className="mb-3 text-sm font-semibold">
                          Project Type
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                          {PROJECT_TYPE_OPTIONS.map((type) => {
                            const checked = field.value.includes(type);

                            return (
                              <button
                                key={type}
                                type="button"
                                className="flex items-center gap-2"
                                onClick={() => {
                                  const next = checked
                                    ? field.value.filter((t) => t !== type)
                                    : [...field.value, type];
                                  field.onChange(next);
                                }}
                              >
                                <span
                                  className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                                    checked
                                      ? 'border-[#A855F7] bg-[#A855F7]'
                                      : 'border-[#4B5563] bg-transparent'
                                  }`}
                                >
                                  {checked && (
                                    <span className="h-2 w-2 rounded-sm bg-white" />
                                  )}
                                </span>

                                <span
                                  className={
                                    checked
                                      ? 'text-white'
                                      : 'text-[#D1D5DB] font-normal'
                                  }
                                >
                                  {type}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {fieldState.error?.message && (
                          <p className="mt-3 text-sm font-bold text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <div className="mt-8 flex items-center justify-between gap-6">
                    <Dialog.Close asChild>
                      <Button
                        type="button"
                        variant="primary"
                        size="primary"
                        className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </Dialog.Close>

                    <Button
                      type="button"
                      variant="primary"
                      size="primary"
                      className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
                      onClick={goNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* =========================
                  STEP 02: PROJECT LEADER
                  ========================= */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold">
                      Current Team Leader
                    </h3>
                  </div>

                  {/* Current leader card */}
                  <div className="rounded-2xl border border-[#111827] bg-[#0B1020] p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            currentLeader?.avatarUrl ??
                            'https://i.pravatar.cc/150?img=13'
                          }
                          alt="Leader avatar"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-base font-semibold">
                            {currentLeader?.name ?? 'No leader selected'}
                          </p>
                          <p className="text-xs text-[#9CA3AF]">
                            {currentLeader?.email ?? '—'}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-[#9CA3AF]">
                        {currentLeader?.role ?? ''}
                      </p>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <input
                      className="h-11 w-full rounded-xl border border-[#1F2937] bg-black/20 px-4 pr-10 text-sm text-white placeholder:text-[#6B7280] outline-none focus:border-[#A855F7]"
                      placeholder="Search name to swap leader"
                      value={leaderQuery}
                      onChange={(e) => setLeaderQuery(e.target.value)}
                    />
                    <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A855F7]" />
                  </div>

                  {/* Results list */}
                  <Controller
                    control={form.control}
                    name="leaderId"
                    rules={{
                      validate: (v) => (v ? true : 'Select a leader'),
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <div className="space-y-2">
                          {filteredLeaders.map((leader) => {
                            const selected = field.value === leader.id;

                            return (
                              <button
                                key={leader.id}
                                type="button"
                                className={`w-full rounded-xl border px-4 py-3 text-left ${
                                  selected
                                    ? 'border-[#A855F7] bg-[#0B1020]'
                                    : 'border-[#1F2937] bg-black/20 hover:border-[#374151]'
                                }`}
                                onClick={() => field.onChange(leader.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={
                                        leader.avatarUrl ??
                                        'https://i.pravatar.cc/150?img=14'
                                      }
                                      alt=""
                                      className="h-9 w-9 rounded-full object-cover"
                                    />
                                    <div>
                                      <p className="text-sm font-semibold">
                                        {leader.name}
                                      </p>
                                      <p className="text-xs text-[#9CA3AF]">
                                        {leader.email}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-[#9CA3AF]">
                                      {leader.role}
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-[#A855F7]" />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {fieldState.error?.message && (
                          <p className="mt-3 text-sm font-bold text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* Buttons: Back / Next */}
                  <div className="mt-8 flex items-center justify-between gap-6">
                    <Button
                      type="button"
                      variant="primary"
                      size="primary"
                      className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
                      onClick={goBack}
                    >
                      Back
                    </Button>

                    <Button
                      type="button"
                      variant="primary"
                      size="primary"
                      className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
                      onClick={goNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* =========================
                  STEP 03: CHANGE STATUS
                  ========================= */}
              {step === 2 && (
                <div className="space-y-10">
                  <Controller
                    control={form.control}
                    name="status"
                    rules={{ required: 'Select a status' }}
                    render={({ field, fieldState }) => (
                      <div className="space-y-6">
                        <StatusOption
                          title="Pending"
                          desc="This idea is waiting for review or further action."
                          checked={field.value === 'Pending'}
                          onSelect={() => field.onChange('Pending')}
                        />
                        <StatusOption
                          title="Approved"
                          desc="This idea is accepted and ready to move forward."
                          checked={field.value === 'Approved'}
                          onSelect={() => field.onChange('Approved')}
                        />
                        <StatusOption
                          title="Archived"
                          desc="This idea is stored for reference and not active right now."
                          checked={field.value === 'Archived'}
                          onSelect={() => field.onChange('Archived')}
                        />

                        {fieldState.error?.message && (
                          <p className="text-sm font-bold text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <div className="mt-8 flex items-center justify-between gap-6">
                    <Dialog.Close asChild>
                      <Button
                        type="button"
                        variant="primary"
                        size="primary"
                        className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </Dialog.Close>

                    <Button
                      type="submit"
                      variant="primary"
                      size="primary"
                      className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </FormBackground>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = [
    { num: '01', label: 'Information' },
    { num: '02', label: 'Project leader' },
    { num: '03', label: 'Change Status' },
  ];

  return (
    <div className="flex items-center justify-center gap-14">
      {steps.map((s, idx) => {
        const isActive = idx === step;
        const isDone = idx < step;

        return (
          <div key={s.num} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                isActive || isDone
                  ? 'border-[#A855F7] text-white'
                  : 'border-[#374151] text-[#9CA3AF]'
              }`}
            >
              {isDone ? '✓' : s.num}
            </div>
            <span
              className={`${isActive ? 'text-white' : 'text-[#6B7280]'} text-xs`}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StatusOption({
  title,
  desc,
  checked,
  onSelect,
}: {
  title: IdeaStatus;
  desc: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-start gap-4 text-left"
      onClick={onSelect}
    >
      <span
        className={`mt-1 flex h-4 w-4 items-center justify-center rounded-full border ${
          checked ? 'border-[#A855F7]' : 'border-[#4B5563]'
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-[#A855F7]" />}
      </span>

      <div>
        <p
          className={`text-sm font-semibold ${checked ? 'text-white' : 'text-white'}`}
        >
          {title}
        </p>
        <p className="mt-1 text-xs text-[#9CA3AF]">{desc}</p>
      </div>
    </button>
  );
}
