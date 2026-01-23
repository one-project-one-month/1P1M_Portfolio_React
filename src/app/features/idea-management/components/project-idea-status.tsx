import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { IdeaEditFormValues } from '../types/project-idea.types';

function StatusOption({
  title,
  desc,
  checked,
  onSelect,
}: {
  title: 'Pending' | 'Approved' | 'Archived';
  desc: string;
  checked: boolean;
  onSelect: () => void;
}) {
  const titleColor =
    title === 'Pending'
      ? 'text-[#F59E0B]'
      : title === 'Approved'
        ? 'text-[#22C55E]'
        : 'text-[#9CA3AF]';

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-start gap-4 text-left"
    >
      {/* radio */}
      <span
        className={`mt-1 flex h-4 w-4 items-center justify-center rounded-full border ${
          checked ? 'border-white' : 'border-[#6B7280]'
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>

      {/* text */}
      <div className="space-y-2">
        <p className={`text-sm font-semibold ${titleColor}`}>{title}</p>
        <p className="text-xs text-[#6B7280]">{desc}</p>
      </div>
    </button>
  );
}

const ProjectIdeaStatus = ({
  form,
}: {
  form: UseFormReturn<IdeaEditFormValues>;
}) => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-semibold text-white">
          Change the idea status!
        </h2>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          Choose a status to reflect the current progress and next step of this
          idea.
        </p>
      </div>

      <Controller
        control={form.control}
        name="status"
        rules={{ required: 'Select a status' }}
        render={({ field, fieldState }) => (
          <div className="space-y-10">
            <StatusOption
              title="Pending"
              desc="This idea is waiting for review or further action."
              checked={field.value === 'PENDING'}
              onSelect={() => field.onChange('PENDING')}
            />

            <StatusOption
              title="Approved"
              desc="This idea is accepted and ready to move forward."
              checked={field.value === 'APPROVED'}
              onSelect={() => field.onChange('APPROVED')}
            />

            <StatusOption
              title="Archived"
              desc="This idea is stored for reference and not active right now."
              checked={field.value === 'ARCHIVED'}
              onSelect={() => field.onChange('ARCHIVED')}
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
        <Dialog.Close>
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
          Update
        </Button>
      </div>
    </div>
  );
};

export default ProjectIdeaStatus;
