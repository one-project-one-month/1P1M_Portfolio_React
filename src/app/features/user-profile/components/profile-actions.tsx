import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import type { DevProfileType } from '../types/user-profile.type';
import { ShareProfileDialog } from './share-profile-dialog';
import UserEditDialog from './user-profile-edit-dialog';

interface ProfileActionsProps {
  devProfile: DevProfileType;
  userId?: number;
  onCopy: (text: string) => void;
  truncate: (text: string, max?: number) => string;
}

export const ProfileActions = ({
  devProfile,
  userId,
  onCopy,
  truncate,
}: ProfileActionsProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <div className="w-full md:max-w-3/12 py-2 md:py-4 flex flex-wrap gap-3 md:gap-4 md:justify-end">
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

      <ShareProfileDialog userId={userId} onCopy={onCopy} truncate={truncate} />
    </div>
  );
};
