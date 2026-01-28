import { opomIconUrl, sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import type { Auth } from '@/hooks/use-auth';
import { getNavLinks } from '@/lib/use-get-nav-links';
import { UserIcon, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CustomHamburger from './custom-hamburger';
import { Button } from './ui/button';

interface NavbarProps {
  auth: Auth; // Lowercase 'auth' is more conventional for prop names
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
      <div className="">
        <img
          src={opomIconUrl}
          alt="Company Logo"
          className="cursor-pointer h-8 transition-transform active:scale-95"
          onClick={() => {
            handleHomeNav(userRole);
            closeMenu();
          }}
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-x-10 font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `relative transition-colors duration-300 py-1 ${
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
      <div className="hidden md:flex items-center gap-3">
        {auth ? (
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <UserIcon size={20} color="white" />
            </div>
            <h3 className="text-white text-sm font-semibold">
              {auth.username}
            </h3>
          </div>
        ) : (
          <Button
            variant="secondary"
            className="rounded-md px-6"
            onClick={() => goTo('/auth/sign-up')}
          >
            Create Account
          </Button>
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85vw] bg-gray-800 flex flex-col p-4 transition-transform duration-500 ease-in-out md:hidden z-[100] border-l border-white/10 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full '
        }`}
      >
        <div className="flex w-full justify-between items-center mb-8 p-1.5 border-b border-white/15">
          <img src={opomIconUrl} alt="Logo" className="h-8" />
          <button
            onClick={closeMenu}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        <div>
          <img src={sampleUserImgUrl} />
          <div>
            <h4>User Name</h4>
            <h3>Email</h3>
          </div>
        </div>

        <div className="flex flex-col gap-y-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                ` transition-colors ${
                  isActive ? 'text-white' : 'text-white/40'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <hr className="border-white/10 my-4" />

          {!auth && (
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
