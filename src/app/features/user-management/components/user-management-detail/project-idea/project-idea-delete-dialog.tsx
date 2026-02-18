import type { IdeaDeleteResponseType } from '@/app/features/user-management/types/project-idea-type';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { type ReactNode } from 'react';

type UserProjectIdeaDeleteProps = {
  trigger?: ReactNode;
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  deleteMutate: UseMutateFunction<
    IdeaDeleteResponseType,
    AxiosError<{ message: string }>,
    { projectIdeaId: number },
    unknown
  >;
  projectIdeaId: number;
};

const UserProjectIdeaDeleteDialog = ({
  trigger,
  deleteOpen,
  setDeleteOpen,
}: UserProjectIdeaDeleteProps) => {
  return (
    <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
      <Dialog.Trigger>
        <button type="button" className="text-white">
          {trigger}
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="410px"
        maxHeight="274px"
        style={{
          background: '#020618',
          color: 'white',
          padding: '60px',
          height: '588px',
          border: '1px solid #364153',
        }}
      >
        <div className="w-full h-full flex flex-col gap-8 ">
          <div className="text-center justify-center items-center">
            <Dialog.Title className="text-[#FFFFFF] font-medium text-2xl leading-8">
              Delete Project Idea?
            </Dialog.Title>
            <Dialog.Description className="text-[#99A1AF]  text-center text-base leading-7">
              Are you sure you want to delete this (project idea)? This action
              cannot be undone.
            </Dialog.Description>
          </div>

          <div className="flex justify-between">
            <Button className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6A7282]">
              Cancel
            </Button>
            <Button className="w-[45%] bg-[#9F0712] hover:bg-[#9F0712] focus:bg-[#9F0712]">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserProjectIdeaDeleteDialog;
