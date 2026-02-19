import type { UseFormReturn } from 'react-hook-form';
import type { EditIdeaType } from '../../../shared/types/project-idea.types';
import ProjectIdeaStatus from '../project-idea-status';

export default function EditStep3({
  form,
  isPending,
  onBack,
}: {
  form: UseFormReturn<Partial<EditIdeaType>>;
  isPending: boolean;
  onBack?: () => void;
}) {
  return (
    <ProjectIdeaStatus
      type="edit-form"
      editForm={form}
      isPending={isPending}
      onBack={onBack}
    />
  );
}
