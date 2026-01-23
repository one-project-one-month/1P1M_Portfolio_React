import type { UseFormReturn } from 'react-hook-form';
import type { IdeaEditFormValues } from '../../types/project-idea.types';
import ProjectIdeaStatus from '../project-idea-status';

export default function EditStep3({
  form,
  onClose,
}: {
  form: UseFormReturn<IdeaEditFormValues>;
  onClose: () => void;
}) {
  return <ProjectIdeaStatus form={form} onClose={onClose} />;
}
