import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { getStatusColor } from '../../shared/lib/idea-utils';
import {
  IdeaStatus,
  type EditIdeaType,
  type IdeaStatusType,
} from '../../shared/types/project-idea.types';

function StatusOption({
  status,
  desc,
  checked,
  onSelect,
}: {
  status: string;
  desc: string;
  checked: boolean;
  onSelect: () => void;
}) {
  const formatStatusLabel = (status: string): string => {
    return status
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

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
        <p
          className="text-sm font-semibold"
          style={{ color: getStatusColor(status) }}
        >
          {formatStatusLabel(status)}
        </p>
        <p className="text-xs text-[#6B7280]">{desc}</p>
      </div>
    </button>
  );
}

const ProjectIdeaStatus = ({
  type,
  statusChangeForm,
  editForm,
  isPending,
  onBack,
}: {
  type: 'status-change-form' | 'edit-form';
  statusChangeForm?: UseFormReturn<IdeaStatusType> | undefined;
  editForm?: UseFormReturn<Partial<EditIdeaType>> | undefined;
  isPending: boolean;
  onBack?: () => void;
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

      {type === 'edit-form' && editForm && (
        <Controller
          control={editForm.control}
          name="status"
          rules={{ required: 'Select a status' }}
          render={({ field, fieldState }) => (
            <div className="space-y-6">
              <StatusOption
                status={IdeaStatus.PENDING}
                desc="This idea is waiting for review or further action."
                checked={field.value === IdeaStatus.PENDING}
                onSelect={() => field.onChange(IdeaStatus.PENDING)}
              />

              <StatusOption
                status={IdeaStatus.APPROVED}
                desc="This idea is accepted and ready to move forward."
                checked={field.value === IdeaStatus.APPROVED}
                onSelect={() => field.onChange(IdeaStatus.APPROVED)}
              />

              <StatusOption
                status={IdeaStatus.IN_PROGRESS}
                desc="This idea is currently being worked on."
                checked={field.value === IdeaStatus.IN_PROGRESS}
                onSelect={() => field.onChange(IdeaStatus.IN_PROGRESS)}
              />

              <StatusOption
                status={IdeaStatus.COMPLETED}
                desc="This idea has been fully implemented and completed."
                checked={field.value === IdeaStatus.COMPLETED}
                onSelect={() => field.onChange(IdeaStatus.COMPLETED)}
              />

              <StatusOption
                status={IdeaStatus.REJECTED}
                desc="This idea has been reviewed and rejected."
                checked={field.value === IdeaStatus.REJECTED}
                onSelect={() => field.onChange(IdeaStatus.REJECTED)}
              />

              <StatusOption
                status={IdeaStatus.DELETED}
                desc="This idea is marked for deletion or archived."
                checked={field.value === IdeaStatus.DELETED}
                onSelect={() => field.onChange(IdeaStatus.DELETED)}
              />

              {fieldState.error?.message && (
                <p className="text-sm font-bold text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      )}
      {type === 'status-change-form' && statusChangeForm && (
        <Controller
          control={statusChangeForm.control}
          name="status"
          rules={{ required: 'Select a status' }}
          render={({ field, fieldState }) => (
            <div className="space-y-6">
              <StatusOption
                status={IdeaStatus.PENDING}
                desc="This idea is waiting for review or further action."
                checked={field.value === IdeaStatus.PENDING}
                onSelect={() => field.onChange(IdeaStatus.PENDING)}
              />

              <StatusOption
                status={IdeaStatus.APPROVED}
                desc="This idea is accepted and ready to move forward."
                checked={field.value === IdeaStatus.APPROVED}
                onSelect={() => field.onChange(IdeaStatus.APPROVED)}
              />

              <StatusOption
                status={IdeaStatus.IN_PROGRESS}
                desc="This idea is currently being worked on."
                checked={field.value === IdeaStatus.IN_PROGRESS}
                onSelect={() => field.onChange(IdeaStatus.IN_PROGRESS)}
              />

              <StatusOption
                status={IdeaStatus.COMPLETED}
                desc="This idea has been fully implemented and completed."
                checked={field.value === IdeaStatus.COMPLETED}
                onSelect={() => field.onChange(IdeaStatus.COMPLETED)}
              />

              <StatusOption
                status={IdeaStatus.REJECTED}
                desc="This idea has been reviewed and rejected."
                checked={field.value === IdeaStatus.REJECTED}
                onSelect={() => field.onChange(IdeaStatus.REJECTED)}
              />

              <StatusOption
                status={IdeaStatus.DELETED}
                desc="This idea is marked for deletion or archived."
                checked={field.value === IdeaStatus.DELETED}
                onSelect={() => field.onChange(IdeaStatus.DELETED)}
              />

              {fieldState.error?.message && (
                <p className="text-sm font-bold text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      )}

      <div className="mt-8 flex items-center justify-between gap-6">
        {type === 'edit-form' && onBack ? (
          <Button
            type="button"
            variant="primary"
            size="primary"
            className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
            disabled={isPending}
            onClick={onBack}
          >
            Back
          </Button>
        ) : (
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
        )}

        <Button
          type="submit"
          variant="primary"
          size="primary"
          className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </div>
  );
};

export default ProjectIdeaStatus;
