import { Button } from '@/components/ui/button';
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes';
import { Copy, Share2, X } from 'lucide-react';

interface ShareProfileDialogProps {
  onCopy: (text: string) => void;
  truncate: (text: string, max?: number) => string;
  shareUrl?: string;
}

export const ShareProfileDialog = ({
  onCopy,
  truncate,
  shareUrl,
}: ShareProfileDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {/* Trigger enhanced to perfectly match the Edit Profile button */}
        <Button
          variant="secondary"
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-sm transition-all duration-300 rounded-xl px-4 py-2 flex items-center gap-2 h-10"
        >
          <Share2 className="w-4 h-4 opacity-70" />
          <span className="hidden sm:inline-block">Share profile</span>
          <span className="sm:hidden">Share</span>
        </Button>
      </Dialog.Trigger>

      {/* Background color and internal styling reverted to original */}
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
            <p>{truncate(shareUrl ?? '')}</p>
          </Tooltip>
          <IconButton
            variant="ghost"
            className="text-gray-600!"
            onClick={() => onCopy(shareUrl ?? '')}
          >
            <Copy size={18} />
          </IconButton>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
