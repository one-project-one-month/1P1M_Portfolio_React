import type { UseFormReturn } from 'react-hook-form';
import type { EditProjectIdeaType } from '../../types/project-idea.types';
import ProjectIdeaStatus from '../project-idea-status';

export default function EditStep3({
  form,
  isPending,
}: {
  form: UseFormReturn<Partial<EditProjectIdeaType>>;
  isPending: boolean;
}) {
  return (
    <ProjectIdeaStatus type="edit-form" editForm={form} isPending={isPending} />
  );
}
