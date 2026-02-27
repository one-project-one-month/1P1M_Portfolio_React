import { LogoutUser } from '@/app/features/auth/login/services/api';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useUserInfoStore } from '@/store/user-info-store';
import { Avatar } from '@radix-ui/themes';
import type { AxiosError } from 'axios';
import { LogOut, Shield, User } from 'lucide-react';
import { memo, useState } from 'react';
import { useToast } from './toast-provider';

type UserProfileProps = {
  username: string;
  email: string;
  img: string;
  role: 'ADMIN' | 'USER';
};

const UserProfile = ({ username, email, img, role }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const profileRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const { goTo } = useAppNavigation();

  const hanldeLogout = async () => {
    setLoading(true);
    if (loading) {
      addToast('Logging out', 'info');
    }

    try {
      await LogoutUser();

      useUserInfoStore.getState().clearUserInfo();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    } finally {
      setLoading(false);
    }
    goTo('/');
  };

  return (
    <div ref={profileRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-x-3.5 text-white hover:opacity-90 transition"
      >
        <Avatar
          src={img}
          alt={username}
          radius="full"
          color="gray"
          className=" bg-gray-600!"
          fallback={username?.slice(0, 1)}
        />
        <h4 className="font-medium">{username}</h4>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 z-[1000] w-[240px] rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-150">
          {/* Profile Info */}
          <div className="px-3 py-3 border-b border-white/5">
            <p className="text-sm font-semibold text-white">{username}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          <div className="flex flex-col mt-2 gap-1">
            <button
              onClick={() => {
                setIsOpen(false);
                goTo(`/profile/${email.split('@')[0]}`);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm 
                         hover:bg-white/5 transition text-gray-200"
            >
              <User size={16} />
              View Profile
            </button>

            {role === 'ADMIN' && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  goTo('/admin');
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition text-gray-200"
              >
                <Shield size={16} />
                Admin Dashboard
              </button>
            )}

            <div className="h-px bg-white/5 my-2" />

            <button
              onClick={hanldeLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-red-500/10 hover:text-red-400 transition text-gray-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UserProfile);
