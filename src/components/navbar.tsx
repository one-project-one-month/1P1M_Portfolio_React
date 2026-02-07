import { opomIconUrl, sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { COLORS } from '@/constants/colors';
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
    <nav className="relative flex w-full justify-between items-center py-6 z-50 px-4 md:px-8">
      {/* Logo Section */}
      <div className="animate-fadeIn">
        <img
          src={opomIconUrl}
          alt="Company Logo"
          className="cursor-pointer h-8 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => {
            handleHomeNav(userRole);
            closeMenu();
          }}
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-x-10 font-medium">
        {navLinks.map((link, index) => (
          <NavLink
            key={link.id}
            to={link.path}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            className={({ isActive }) =>
              `relative transition-all duration-300 py-1 group animate-slideDown ${
                isActive ? 'text-white' : 'text-white/60 hover:text-white'
              } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-300 ${
                isActive
                  ? 'after:w-full'
                  : 'after:w-0 hover:after:w-full hover:after:bg-white/60'
              }`
            }
          >
            <span>{link.name}</span>
            {/* Primary color gradient underline for active state */}
            <NavLink to={link.path}>
              {({ isActive }) =>
                isActive && (
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${COLORS.primary}, #9C39FC)`,
                    }}
                  />
                )
              }
            </NavLink>
          </NavLink>
        ))}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center gap-3 animate-fadeIn">
        {auth ? (
          <div className="transition-transform duration-300 hover:scale-105">
            <UserProfile
              email={auth?.email}
              img={auth?.profile ?? sampleUserImgUrl}
              username={auth.username}
            />
          </div>
        ) : (
          <Button
            variant="secondary"
            className="rounded-md px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFBA00]/20"
            onClick={() => goTo('/auth/sign-up')}
          >
            Create Account
          </Button>
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85vw] bg-gray-900 flex flex-col gap-y-4 transition-transform duration-500 ease-in-out md:hidden z-[100] border-l border-white/10 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex w-full justify-between items-center mb-2 p-1.5 border-b border-white/15">
          <img
            src={opomIconUrl}
            alt="Logo"
            className={`ms-2 transition-all duration-500 ${isMenuOpen ? 'animate-slideRight' : 'opacity-0'}`}
          />
          <button
            onClick={closeMenu}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        {auth && (
          <div
            className={`flex gap-4 justify-start mx-2.5 items-center py-1 transition-all duration-500 ${isMenuOpen ? 'animate-slideUp' : 'opacity-0'}`}
          >
            <img
              src={auth?.profile ?? sampleUserImgUrl}
              className="size-13 rounded-full transition-transform duration-300 hover:scale-110"
              alt="User profile"
            />
            <div className="text-white">
              <h4 className="font-medium text-xl">{auth?.username}</h4>
              <h3 className="font-light">{auth?.email}</h3>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-y-3">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.id}
              to={link.path}
              onClick={closeMenu}
              style={{
                animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
              }}
              className={({ isActive }) =>
                `relative flex text-white py-3 px-4 items-center w-full transition-all duration-300 ${
                  isMenuOpen ? 'animate-slideRight' : 'opacity-0'
                } ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#6F28B3]/20 to-transparent shadow-lg shadow-[#6F28B3]/10 border-l-4'
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:translate-x-1'
                }`
              }
            >
              <NavLink to={link.path}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute left-0 top-0 h-full w-1"
                        style={{
                          backgroundColor: COLORS.primary,
                        }}
                      />
                    )}
                    <span>{link.name}</span>
                  </>
                )}
              </NavLink>
            </NavLink>
          ))}

          <hr className="border-white/10 my-4" />

          {!auth ? (
            <div
              className={`flex justify-center mx-2 transition-all duration-500 ${isMenuOpen ? 'animate-slideUp' : 'opacity-0'}`}
            >
              <Button
                variant="secondary"
                className="w-full text-lg h-14 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FFBA00]/20"
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
              className={`text-white ms-4 transition-all duration-300 hover:bg-red-500/20 hover:translate-x-1 ${isMenuOpen ? 'animate-slideUp' : 'opacity-0'}`}
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
