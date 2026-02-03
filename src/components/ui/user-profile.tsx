import Button from '@/app/features/auth/login/components/button';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useClickOutside } from '@/hooks/use-click-outside';
import { logout } from '@/lib/utils';
import { memo, useState } from 'react';

type UserProfile = {
  username: string;
  email: string;
  img: string;
};

const UserProfile = (Profile: UserProfile) => {
  const profileRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);
  const { goTo } = useAppNavigation();

  return (
    <div ref={profileRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-x-3.5 text-white"
      >
        <img className="size-12 rounded-full" src={Profile.img} />
        <h4>{Profile.username}</h4>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-[1000] w-[220px] rounded-md bg-gray-800 text-start shadow-lg flex flex-col px-2.5 py-4 gap-2">
          <Button
            onClick={() => goTo('/me')}
            variant={'black_button'}
            className="px-2.5 py-4"
          >
            View Profile
          </Button>
          <Button
            onClick={logout}
            variant={'white_button'}
            className="text-gray-950"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(UserProfile);
