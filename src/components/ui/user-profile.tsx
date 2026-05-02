import { LogoutUser } from '@/app/features/auth/login/services/api';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useUserInfoStore } from '@/store/user-info-store';
import { Avatar } from '@radix-ui/themes';
import type { AxiosError } from 'axios';
import { ChevronDown, Loader2, LogOut, Shield, User } from 'lucide-react';
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

  const handleLogout = async () => {
    // Fixed: Previous logic checked 'loading' state immediately after setting it,
    // which would fail due to React's asynchronous state updates.
    setLoading(true);
    addToast('Logging out...', 'info');

    try {
      await LogoutUser();
      useUserInfoStore.getState().clearUserInfo();
      goTo('/');
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      addToast('Failed to logout. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={profileRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="group flex items-center gap-x-3 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-300 outline-none"
      >
        <div className="relative rounded-full p-0.5 bg-white/10 backdrop-blur-md border border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <Avatar
            src={img}
            alt={username}
            radius="full"
            size="2"
            color="gray"
            className="bg-gray-800"
            fallback={username?.slice(0, 1)}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <h4 className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors hidden sm:block">
            {username}
          </h4>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-[1000] w-[240px] rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-2 animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200">
          {/* Profile Info Header */}
          <div className="px-3 py-3 mb-1 bg-white/5 rounded-xl border border-white/5">
            <p className="text-sm font-bold text-white truncate">{username}</p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{email}</p>
          </div>

          {/* Action Links */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setIsOpen(false);
                goTo(`/profile/${email.split('@')[0]}`);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-colors text-gray-300 hover:text-white group"
            >
              <User
                size={16}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
              View Profile
            </button>

            {role === 'ADMIN' && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  goTo('/admin');
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-colors text-gray-300 hover:text-white group"
              >
                <Shield
                  size={16}
                  className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                />
                Admin Dashboard
              </button>
            )}

            <div className="h-px bg-white/10 my-1 mx-2" />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-red-500/15 transition-colors text-gray-300 hover:text-red-400 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={16} className="text-red-400 animate-spin" />
              ) : (
                <LogOut
                  size={16}
                  className="text-gray-400 group-hover:text-red-400 transition-colors"
                />
              )}
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UserProfile);
