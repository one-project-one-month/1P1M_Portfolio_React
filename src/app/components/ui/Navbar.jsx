import { opomIconUrl, sampleUserImgUrl } from "@/assets/icons/iconUrls";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";

import { authUtils } from "@/lib/utils";
import { useUserProfile } from "@/queries/useGetProfile";

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [userImgUrl, setUserImgUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getNavLinks = () => {
    const isAdmin = user?.role === "ADMIN";

    return [
      { id: 1, name: "Portfolio", path: "/project-portfolio" },
      { id: 2, name: "Dev Profiles", path: "/dev-list" },
      { id: 3, name: "Ideas", path: isAdmin ? "/admin/ideas" : "/ideas" },
      {
        id: 3,
        name: "Approved Ideas",
        path: isAdmin ? "/admin/approved-ideas" : "/approved-ideas",
      },
    ];
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuth(false);
    setUser(null);
    setIsDropdownOpen(false);

    navigate("/");
  };

  const handleViewProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);

        setIsAuth(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setIsAuth(false);
        setUser(null);
      }
    } else {
      setIsAuth(false);
      setUser(null);
    }
  }, []);

  const { data } = useUserProfile(user?.id);

  useEffect(() => {
    if (data?.data.devProfile.profilePictureUrl) {
      setUserImgUrl(data?.data.devProfile.profilePictureUrl);
    }
  }, [data]);

  console.log("NAV",user);
  

  const handleHomeNav=()=>{
    if(user?.role==="ADMIN") {
      
      
      navigate("/admin") 
    }else{
      navigate("/")
    }
  }

  return (
    <nav className="h-11 flex w-full justify-between items-center py-10">
      <div className="text-2xl text-white">
        <img src={opomIconUrl} className="cursor-pointer" onClick={handleHomeNav} />
      </div>
      {/* nav_links */}
      <div className=" font-medium flex gap-x-10 p-1">
        {getNavLinks().map((link) => (
          <NavLink
            key={link.id}
            id={link.id}
            to={link.path}
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-[#ADADADA3]"}`
            }
          >
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div>
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
      </div>
    </nav>
  );
}

export default Navbar;
