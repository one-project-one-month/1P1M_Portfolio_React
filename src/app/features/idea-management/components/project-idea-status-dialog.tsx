import { Dialog } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import ProjectIdeaStatus from './project-idea-status';

function ProjectIdeaStatusDialog({
  trigger,
  devId,
}: {
  trigger?: ReactNode;
  devId: number;
}) {
  const form = useForm({
    defaultValues: {
      dev_id: devId,
      status: 'PENDING',
    },
    mode: 'onSubmit',
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger || <>View Status</>}</Dialog.Trigger>
      <Dialog.Content
        size="4"
        maxWidth="758px"
        className="bg-black! text-white px-16! py-12! rounded-3xl!"
      >
        <ProjectIdeaStatus form={form} />
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ProjectIdeaStatusDialog;
