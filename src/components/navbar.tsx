import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { opomIconUrl } from '@/assets/icons/iconUrls';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { getNavLinks } from '@/lib/use-get-nav-links';

import CustomHamburger from './custom-hamburger';
import { Button } from './ui/button';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { handleHomeNav, goTo } = useAppNavigation();
  
 
  const userRole = 'USER';
  const navLinks = getNavLinks();

  const toggleMenu = () => {
  
    if (!document.startViewTransition) {
      setIsMenuOpen(!isMenuOpen);
      return;
    }
    
    document.startViewTransition(() => {
      setIsMenuOpen(!isMenuOpen);
    });
  };

  return (
    <nav className="relative flex w-full justify-between items-center py-6 z-50">
      {/* Logo Section */}
      <div className="z-100">
        <img
          src={opomIconUrl}
          alt="Logo"
          className="cursor-pointer h-8"
          onClick={() => handleHomeNav(userRole)}
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-x-10 font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <Button
        className="md:block hidden"
        variant="secondary"
        size={'primary'}
        onClick={() => goTo('/callback')}
      {/* Desktop Action Button */}
      <div className="hidden md:block">
        <Button variant="secondary" size="primary" onClick={() => goTo('/callback')}>
          Create Account
        </Button>
      </div>

     
      <div
        className={`fixed  inset-0 bg-black flex flex-col justify-start p-6 gap-8 text-xl font-medium transition-all duration-500 md:hidden z-[100] ${
          isMenuOpen ? 'translate-x-0' :'-translate-x-full'
        }`}
      >


 <div className="z-102">
        <img
          src={opomIconUrl}
          alt="Logo"
          className="cursor-pointer h-8"
          onClick={() => handleHomeNav(userRole)}
        />
      </div>

        
        <div className='flex flex-col px-2 gap-y-5 text-md'>
          {navLinks.map((link) => (
          <NavLink
          
            key={link.id}
            to={link.path}
            onClick={() => setIsMenuOpen(false)} 
             className={({ isActive }) =>
              ` transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
            }
          >
            {link.name}
          </NavLink>
        ))}
        </div>
        
      </div>

      {/* Hamburger Trigger */}
      <CustomHamburger isOpen={isMenuOpen} onToggle={toggleMenu} />
    </nav>
  );
}

export default Navbar;