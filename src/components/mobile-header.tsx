import { opomIconUrl } from '@/assets/icons/iconUrls';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import type { NavbarProps } from './navbar';
import UserProfile from './ui/user-profile';

const MobileHeader = ({auth}:NavbarProps) => {
  const { goTo } = useAppNavigation();

  return (
    <nav className="w-full flex items-center justify-between   p-2 mt-3">
      
      <img
        src={opomIconUrl}
        alt="Company Logo"
        className="cursor-pointer h-8 transition-transform active:scale-95 hover:scale-105"
      />

      <div className="flex items-center gap-2.5">
        {!auth ? (
          <>
            <button
              type="button"
              className="text-sm px-4 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer"
              onClick={() => goTo('/auth/log-in')}
            >
              Login
            </button>
            <button
              type="button"
              className="text-sm px-4 py-1.5 rounded-md bg-[#9C39FC]/30 backdrop-blur-sm border border-[#9C39FC]/20 text-white hover:bg-[#9C39FC]/40 transition-all duration-200 cursor-pointer"
              onClick={() => goTo('/auth/sign-up')}
            >
              Sign Up
            </button>
          </>
        ) : (
          <UserProfile
            email={auth.email}
            img={auth?.profile ?? ''}
            role={auth.role ?? 'USER'}
            username={auth.username}
          />
        )}
      </div>
    </nav>
  );
};

export default MobileHeader;
