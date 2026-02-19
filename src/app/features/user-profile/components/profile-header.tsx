import { Avatar, IconButton } from '@radix-ui/themes';
import { GithubIcon, Linkedin } from 'lucide-react';
import type { DevProfileType } from '../types/user-profile.type';

interface ProfileHeaderProps {
  devProfile: DevProfileType;
}

export const ProfileHeader = ({ devProfile }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col space-y-3 items-center">
      <Avatar
        size="9"
        src={devProfile?.profilePictureUrl}
        fallback={devProfile?.name?.charAt(0) || 'U'}
      />
      <div className="flex items-center justify-center gap-2">
        {devProfile?.github && (
          <IconButton
            radius="full"
            variant="outline"
            className="text-white! border! border-white!"
            onClick={() => window.open(devProfile.github, '_blank')}
          >
            <GithubIcon width="18" height="18" />
          </IconButton>
        )}
        {devProfile?.linkedIn && (
          <IconButton
            radius="full"
            variant="outline"
            className="text-white! border! border-white!"
            onClick={() => window.open(devProfile.linkedIn, '_blank')}
          >
            <Linkedin width="18" height="18" />
          </IconButton>
        )}
      </div>
    </div>
  );
};
