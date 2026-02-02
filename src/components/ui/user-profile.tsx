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
  const profileRef = useClickOutside<HTMLButtonElement>(() => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);
  const { goTo } = useAppNavigation();

  return (
    <button
      ref={profileRef}
      onClick={() => setIsOpen(true)}
      className="relative flex items-center  gap-x-3.5 w-full text-white"
    >
      <img className="size-12 rounded-full" src={Profile.img} />
      <h4>{Profile.username}</h4>

      {isOpen && (
        <div className="bg-gray-800 w-[220px] transition-all ease-in-out z-1000 top-0 absolute right-0 text-start flex flex-col px-2.5 py-4 gap-2 rounded-md">
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
    </button>
  );
};

export default memo(UserProfile);
