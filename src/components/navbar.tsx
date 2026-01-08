import { opomIconUrl } from '@/assets/icons/iconUrls';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { getNavLinks } from '@/lib/use-get-nav-links';
import { NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import CustomHamburger from './custom-hamburger';

function Navbar() {
  //sample user role
  const userRole = 'USER';

  const { handleHomeNav, goTo } = useAppNavigation();

  return (
    <nav className=" h-11 flex w-full justify-between items-center py-10">
      <div className="text-2xl text-white">
        <img
          src={opomIconUrl}
          className="cursor-pointer"
          onClick={() => handleHomeNav(userRole)}
        />
      </div>
      {/* nav_links */}
      <div className="font-medium md:flex gap-x-10 p-1  hidden">
        {getNavLinks().map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `relative px-1 py-0.5 transition-all duration-300 ease-in-out
        ${isActive ? 'text-white' : 'text-[#ADADADA3]'}`
            }
          >
            <span className="relative">{link.name}</span>
          </NavLink>
        ))}
      </div>




      

      <Button
      className='md:block hidden'
        variant="secondary"
        size={'primary'}
        onClick={() => goTo('/callback')}
      >
        Create Account
      </Button>

      <CustomHamburger />

      {/* <div>
        {!isAuth ? (
          <Button
            variant="secondary"
            size={"primary"}
            onClick={() => navigate("/callback")}
          >
            Create Account
          </Button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <div
              className="text-white font-medium flex gap-x-2.5 items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleDropdown}
            >
              <img
                src={userImgUrl || sampleUserImgUrl}
                className="size-9 rounded-full object-cover"
                alt="User profile"
              />
              <span>{user?.username || user?.email || "User"}</span>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl shadow-lg z-50">
                <div className="py-2">
                  <button
                    onClick={handleViewProfile}
                    className="w-full px-4 py-3 text-left text-white hover:bg-[#2A2A2A] transition-colors rounded-t-2xl flex items-center gap-3"
                  >
                    View profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-left text-white hover:bg-[#2A2A2A] transition-colors rounded-b-2xl flex items-center gap-3"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div> */}
    </nav>
  );
}

export default Navbar;
