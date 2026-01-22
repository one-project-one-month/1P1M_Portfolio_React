import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { PROJECT_TYPE_OPTIONS } from '@/constants';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type {
  IdeaCreateFormProps,
  IdeaCreateFormValues,
} from '../types/project-idea.types';

export default function IdeaCreateForm({
  isOpen,
  onClose,
  onSubmit,
}: IdeaCreateFormProps) {
  const form = useForm<IdeaCreateFormValues>({
    defaultValues: {
      name: '',
      description: '',
      projectTypes: [],
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen, form]);

  function handleSave(values: IdeaCreateFormValues) {
    onSubmit?.(values);
    onClose();
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 outline-none">
          <FormBackground className="w-full rounded-3xl px-10 py-10 text-white shadow-2xl">
            <Dialog.Title className="mb-2 text-2xl font-semibold">
              Create the idea information!
            </Dialog.Title>
            <Dialog.Description className="text-sm text-[#9CA3AF]">
              Choose a status to reflect the current progress and next step of
              this idea.
            </Dialog.Description>

            <form
              className="mt-12 flex w-full flex-col gap-12"
              onSubmit={form.handleSubmit(handleSave)}
            >
              <div className="space-y-10">
                <Controller
                  control={form.control}
                  name="name"
                  rules={{
                    required: 'Project idea name is required',
                    minLength: { value: 2, message: 'Minimum 2 characters' },
                  }}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="mb-1 block text-sm font-semibold">
                        Project Idea Name
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
                    minLength: { value: 10, message: 'Minimum 10 characters' },
                  }}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="mb-1 block text-sm font-semibold">
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
                      v.length > 0 ? true : 'Select at least one project type',
                  }}
                  render={({ field, fieldState }) => (
                    <div>
                      <p className="mb-2 text-sm font-semibold">Project Type</p>

                      <div className="flex flex-wrap gap-6 text-sm">
                        {PROJECT_TYPE_OPTIONS.map((type) => {
                          const checked = field.value.includes(type);

                          return (
                            <button
                              key={type}
                              type="button"
                              className="flex items-center gap-2 text-sm"
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
              </div>

              <div className="flex items-center justify-between gap-4">
                <Dialog.Close asChild>
                  <Button
                    type="button"
                    variant="primary"
                    size="primary"
                    className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
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
                  Save Idea
                </Button>
              </div>
            </form>
          </FormBackground>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
