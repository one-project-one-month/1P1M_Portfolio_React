import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import { type ReactNode } from 'react';

type UserManagementRestoreDialogProps = {
  trigger?: ReactNode;
  restoreOpen: boolean;
  setRestoreOpen: (open: boolean) => void;
  userId: number;
};

const UserManagementRestoreDialog = ({
  trigger,
  restoreOpen,
  setRestoreOpen,
  //   userId,
}: UserManagementRestoreDialogProps) => {
  return (
    <Dialog.Root open={restoreOpen} onOpenChange={setRestoreOpen}>
      <Dialog.Trigger>{trigger || <>View Detail</>}</Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="410px"
        maxHeight="274px"
        style={{
          background: '#020618',
          color: 'white',
          padding: '60px',
          height: '588px',
          border: '1px solid #008236',
        }}
      >
        <div className="w-full h-full flex flex-col gap-8 ">
          <div className="text-center justify-center items-center">
            <Dialog.Title className="text-[#FFFFFF] font-medium text-2xl leading-8">
              Confirm User Restoration?
            </Dialog.Title>
            <Dialog.Description className="text-[#99A1AF]  text-center text-base leading-7">
              Restoring this user will remove the ban and reactivate their
              account with normal access.
            </Dialog.Description>
          </div>

          <div className="flex justify-between">
            <Button className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6A7282]">
              Cancel
            </Button>
            <Button className="w-[45%] bg-[#008236] hover:bg-[#008236] focus:bg-[#008236]">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserManagementRestoreDialog;
