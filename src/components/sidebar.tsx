import { opomIconUrl, sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { ADMIN_NAVS } from '@/constants';
import { useUserInfoStore } from '@/store/user-info-store';
import { Tooltip } from '@radix-ui/themes';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const user = useUserInfoStore.getState().userInfo;

  return (
    <div className="bg-slate-900 h-full relative text-white w-full flex flex-col justify-between py-6">
      <div className="space-y-10">
        {/* logo */}
        <div className="text-center flex justify-start items-center px-4">
          <img src={opomIconUrl} alt="OPOM" />
        </div>

        <nav className="text-sm">
          <div className="flex items-center gap-x-4 px-4">
            <img src={sampleUserImgUrl} className="size-12 rounded-full" />
            <Tooltip content={user?.username ?? 'User'}>
              <span className="font-medium text-base">
                {user?.username ?? 'User'}
              </span>
            </Tooltip>
          </div>
          {ADMIN_NAVS.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `flex my-2.5 gap-x-4 p-4 items-center font-medium text-base w-full truncate transition-colors duration-100 ${isActive ? 'border-l-4 border-l-[#9C39FC] bg-slate-800' : 'text-white hover:bg-white/4'}`
              }
            >
              <link.icon className="size-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <button className="flex gap-x-4 p-4 items-center font-medium text-base w-full truncate transition-colors duration-100 text-white hover:bg-white/4">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
