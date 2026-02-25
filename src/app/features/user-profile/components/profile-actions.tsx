import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import type { DevProfileType } from '../types/user-profile.type';
import { ShareProfileDialog } from './share-profile-dialog';
import UserEditDialog from './user-profile-edit-dialog';

interface ProfileActionsProps {
  devProfile: DevProfileType;
  onCopy: (text: string) => void;
  truncate: (text: string, max?: number) => string;
  className?: string;
  isMyProfile?: boolean;
  shareUrl?: string;
}

export const ProfileActions = ({
  devProfile,
  onCopy,
  truncate,
  className,
  isMyProfile = false,
  shareUrl,
}: ProfileActionsProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        'w-full md:max-w-3/12 py-2 md:py-4 flex flex-wrap gap-3 md:gap-4 md:justify-end',
        className,
      )}
    >
      {isMyProfile && (
        <Dialog.Root
          open={editDialogOpen}
          onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}
        >
          <Dialog.Trigger>
            <Button className="bg-transparent px-4 border border-[#9C39FC] w-full sm:w-auto">
              Edit profile
            </Button>
          </Dialog.Trigger>
          <UserEditDialog
            data={devProfile}
            setEditDialogOpen={setEditDialogOpen}
          />
        </Dialog.Root>
      )}

      <ShareProfileDialog
        shareUrl={shareUrl}
        onCopy={onCopy}
        truncate={truncate}
      />
    </div>
  );
};
