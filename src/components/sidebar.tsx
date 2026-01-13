import { opomIconUrl } from '@/assets/icons/iconUrls';
import { ADMIN_NAVS } from '@/constants';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 h-full relative text-white w-full">
      {/* logo */}
      <div className="text-center flex justify-center items-center p-2 ">
        <img src={opomIconUrl} className="" />
      </div>

      <nav>
        {ADMIN_NAVS.map((link) => (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `flex my-2.5 gap-x-5 p-3 items-center w-full  transition-colors duration-300 ${isActive ? 'border-l-4 border-l-[#9C39FC] bg-slate-800 rounded-r-xl ' : 'text-white/60 hover:text-white'}`
            }
          >
            <link.icon />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="p-3 my-6 absolute flex bottom-0 gap-x-2.5">
        <LogOut />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
