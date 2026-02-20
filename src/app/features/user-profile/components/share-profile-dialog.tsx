import { Button } from '@/components/ui/button';
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes';
import { Copy, X } from 'lucide-react';

interface ShareProfileDialogProps {
  onCopy: (text: string) => void;
  truncate: (text: string, max?: number) => string;
}

export const ShareProfileDialog = ({
  onCopy,
  truncate,
}: ShareProfileDialogProps) => {
  const shareUrl = window.location.href;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="px-4">Share profile</Button>
      </Dialog.Trigger>
      <Dialog.Content
        size="2"
        maxWidth="450px"
        className="bg-black! text-white!"
      >
        <div className="flex items-center justify-end">
          <Dialog.Close>
            <IconButton variant="ghost" className="text-white!">
              <X />
            </IconButton>
          </Dialog.Close>
        </div>
        <Dialog.Title align="center">Share with your friends</Dialog.Title>

        <Dialog.Description
          size="3"
          className="text-gray-400"
          mb="4"
          align="center"
        >
          Share this profile link with others so they can view this user's
          public information.
        </Dialog.Description>

        <div className="flex items-center justify-between py-2 px-4 bg-slate-900 rounded-md border border-[#364153] truncate">
          <Tooltip content={shareUrl}>
            <p>{truncate(shareUrl)}</p>
          </Tooltip>
          <IconButton
            variant="ghost"
            className="text-gray-600!"
            onClick={() => onCopy(shareUrl)}
          >
            <Copy size={18} />
          </IconButton>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
