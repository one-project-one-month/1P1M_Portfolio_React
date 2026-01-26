import { Button } from '@/components/ui/button';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { PROJECT_TYPE_OPTIONS } from '@/constants';
import { Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { CreateProjectIdeaType } from '../types/project-idea.types';

export default function IdeaCreateForm({
  form,
  handleCreate,
  isPending,
}: {
  form: UseFormReturn<CreateProjectIdeaType>;
  handleCreate: (formData: CreateProjectIdeaType) => void;
  isPending: boolean;
}) {
  return (
    <Dialog.Content className="bg-black! text-white px-14! py-10! rounded-3xl!">
      <div className="flex items-center justify-end mb-4">
        <Dialog.Close>
          <X className="cursor-pointer" size={30} />
        </Dialog.Close>
      </div>
      <Dialog.Title className="mb-2 text-2xl font-semibold">
        Create the idea information!
      </Dialog.Title>
      <Dialog.Description className="text-sm text-[#9CA3AF]">
        Choose a status to reflect the current progress and next step of this
        idea.
      </Dialog.Description>
      <form
        className="mt-12 flex w-full flex-col gap-12"
        onSubmit={form.handleSubmit(handleCreate)}
      >
        <div className="space-y-10">
          <Controller
            control={form.control}
            name="projectName"
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
                        className="flex items-center gap-2 text-sm capitalize"
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
          <Dialog.Close>
            <Button
              type="button"
              variant="primary"
              size="primary"
              className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
              disabled={isPending}
            >
              Cancel
            </Button>
          </Dialog.Close>

          <Button
            type="submit"
            variant="primary"
            size="primary"
            className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save Idea'}
          </Button>
        </div>
      </form>
    </Dialog.Content>
  );
}
