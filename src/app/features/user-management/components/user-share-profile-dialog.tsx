import Copy from '@/assets/icons/copy.png';
import { Dialog } from '@radix-ui/themes';
import { type ReactNode } from 'react';

type UserManagementRestoreDialogProps = {
  trigger?: ReactNode;
  shareOpen: boolean;
  setShareOpen: (open: boolean) => void;
};

const UserShareProfile = ({
  trigger,
  shareOpen,
  setShareOpen,
}: UserManagementRestoreDialogProps) => {
  return (
    <Dialog.Root open={shareOpen} onOpenChange={setShareOpen}>
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
          background: '#000000',
          color: 'white',
          padding: '60px',
          height: '588px',
          border: '1px solid #364153',
        }}
      >
        <div className="w-full h-full flex flex-col gap-8 ">
          <div className="text-center justify-center items-center">
            <Dialog.Title className="text-[#FFFFFF] font-sans font-bold text-xl leading-8">
              Share with your friends
            </Dialog.Title>
            <Dialog.Description className="text-[#99A1AF]  text-center text-base leading-7">
              Share this profile link with others so they can view this user’s
              public information.
            </Dialog.Description>
          </div>

          <div className="bg-[#0F172B] w-[308px] mx-auto flex gap-2 border border-[#1D293D] p-4">
            <p className="text-xs text-[#99A1AF]">
              Seahttps://www.figma.com/design/yClYehYs...
            </p>
            <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserShareProfile;
