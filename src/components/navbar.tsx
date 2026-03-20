import { opomIconUrl, sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { getNavLinks } from '@/lib/use-get-nav-links';
import { logout } from '@/lib/utils';
import type { UserInfo } from '@/store/user-info-store';
import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CustomHamburger from './custom-hamburger';
import { Button } from './ui/button';
import UserProfile from './ui/user-profile';

interface NavbarProps {
  auth: UserInfo | null;
}

function Navbar({ auth }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { handleHomeNav, goTo } = useAppNavigation();

  const userRole = 'USER';
  const navLinks = getNavLinks();

  // Optimized toggle with View Transition support
  const toggleMenu = useCallback(() => {
    const changeState = () => setIsMenuOpen((prev) => !prev);

    if (document.startViewTransition) {
      document.startViewTransition(changeState);
    } else {
      changeState();
    }
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="relative flex w-full justify-between items-center py-6 z-50">
      {/* Logo Section */}
      <img
        src={opomIconUrl}
        alt="Company Logo"
        className="cursor-pointer h-8 transition-transform active:scale-95 hover:scale-105"
        onClick={() => {
          handleHomeNav(userRole);
          closeMenu();
        }}
      />

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-x-6 2xl:gap-x-12 font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `relative whitespace-nowrap transition-colors duration-300 py-1 ${
                isActive
                  ? 'text-white  after:bg-white'
                  : 'text-white/60 hover:text-white'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        {auth ? (
          <UserProfile
            email={auth?.email}
            img={auth?.profile ?? sampleUserImgUrl}
            username={auth.username}
            role={auth?.role ?? 'USER'}
          />
        ) : (
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
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85vw] sm:w-[50svw] bg-gray-900 flex flex-col gap-y-4 transition-transform duration-500 ease-in-out md:hidden z-100 border-l border-white/10 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full '
        }`}
      >
        <div className="flex w-full justify-between items-center  mb-2 p-1.5  border-b border-white/15">
          <img src={opomIconUrl} alt="Logo" className="ms-2" />
          <button
            onClick={closeMenu}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        {auth && (
          <div className="flex gap-4  justify-start mx-2.5 items-center py-1">
            <img
              src={auth?.profile ?? sampleUserImgUrl}
              className="size-13 rounded-full"
            />
            <div className="text-white">
              <h4 className="font-medium text-xl">{auth?.username}</h4>
              <h3 className="font-light">{auth?.email}</h3>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-y-3 ">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex text-white py-3 px-4  items-center w-full  transition-colors duration-300 ${isActive ? 'border-l-4 text-gray-800 border-l-[#9C39FC] bg-[#1D293D]/80 ' : 'text-white/60 hover:text-white'}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <hr className="border-white/10 my-4" />

          {!auth ? (
            <div className="flex justify-center mx-2">
              <Button
                variant="secondary"
                className="w-full text-lg h-14"
                onClick={() => {
                  goTo('/auth/sign-up');
                  closeMenu();
                }}
              >
                Create Account
              </Button>
            </div>
          ) : (
            <Button
              variant="black_small_button"
              size={'black_small_button'}
              onClick={logout}
              className="text-white ms-4"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Hamburger Trigger - Visible only on Mobile */}
      <div className="md:hidden">
        <CustomHamburger isOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>
    </nav>
  );
}

export default Navbar;
