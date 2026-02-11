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
    <div className="max-w-3/12 space-x-4 py-4">
      <Dialog.Root
        open={editDialogOpen}
        onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}
      >
        <Dialog.Trigger>
          <Button className="bg-transparent border border-[#9C39FC]">
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
