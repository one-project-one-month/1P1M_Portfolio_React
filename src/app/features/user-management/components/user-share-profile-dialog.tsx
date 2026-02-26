import Copy from '@/assets/icons/copy.png';
import { useToast } from '@/components/ui/toast-provider';
import { Dialog } from '@radix-ui/themes';
import { type ReactNode } from 'react';

type UserManagementRestoreDialogProps = {
  trigger?: ReactNode;
  shareOpen: boolean;
  setShareOpen: (open: boolean) => void;
  userName: string;
};

const UserShareProfile = ({
  trigger,
  shareOpen,
  setShareOpen,
  userName,
}: UserManagementRestoreDialogProps) => {
  const { addToast } = useToast();
  const handleCopy = (text: string) => {
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        addToast('Copied to clipboard!', 'success', 3000);
      })
      .catch((err) => {
        console.error('Failed to copy!', err);
        addToast('Failed to copy!', 'error', 3000);
      });
  };
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

          <div className="bg-[#0F172B] w-[318px] mx-auto flex gap-2 border border-[#1D293D] p-4 items-center">
            <p className="text-xs text-[#99A1AF] break-all">
              {`http://localhost:5173/profile/${userName}`}
            </p>
            <button
              type="button"
              onClick={() =>
                handleCopy(`http://localhost:5173/profile/${userName}`)
              }
            >
              <img src={Copy} alt="copy" className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserShareProfile;
