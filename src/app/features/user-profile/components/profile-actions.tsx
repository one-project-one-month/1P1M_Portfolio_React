import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog } from '@radix-ui/themes';
import { Edit2 } from 'lucide-react';
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
    <div className={cn('flex items-center gap-3 transition-all', className)}>
      {isMyProfile && (
        <Dialog.Root
          open={editDialogOpen}
          onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}
        >
          <Dialog.Trigger>
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-sm transition-all duration-300 rounded-xl px-4 py-2 flex items-center gap-2 h-10"
            >
              <Edit2 className="w-4 h-4 opacity-70" />
              <span className="hidden sm:inline-block">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </Dialog.Trigger>
          <UserEditDialog
            data={devProfile}
            setEditDialogOpen={setEditDialogOpen}
          />
        </Dialog.Root>
      )}

      {/* 
        Note: You may also want to apply similar glassmorphism 
        classes to the trigger button inside ShareProfileDialog 
        to keep the UI perfectly consistent! 
      */}
      <ShareProfileDialog
        shareUrl={shareUrl}
        onCopy={onCopy}
        truncate={truncate}
      />
    </div>
  );
};
