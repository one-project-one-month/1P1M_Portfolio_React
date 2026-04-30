import { MOBILE_NAVS } from "@/constants";
import { NavLink } from "react-router-dom";

const FooterNav = () => {
  return (
    <div className="w-full p-4 mb-0  fixed rounded-tr-3xl rounded-tl-3xl left-0 right-0 z-[9999] bottom-0 text-white bg-gray-700/15 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center justify-between">
        {MOBILE_NAVS.map((item) => {
          const Icon = item.icon as React.ElementType;
          return (
            <NavLink
              key={item.id}
              to={item?.path}
              className={({ isActive }) =>
                `flex gap-2 flex-col justify-center items-center transition-colors duration-200 ${
                  isActive ? "text-purple-500" : "text-white/50 hover:text-white/80"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm">{item?.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default FooterNav;