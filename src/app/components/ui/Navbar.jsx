import { opomIconUrl, UserImgUrl } from "@/assets/icons/iconUrls";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const getNavLinks = () => {
    const isAdmin = user?.role === "ADMIN";

    return [
      { id: 1, name: "Portfolio", path: "/project-portfolio" },
      { id: 2, name: "Dev Profiles", path: "/dev-list" },
      { id: 3, name: "Ideas", path: isAdmin ? "/admin/ideas" : "/ideas" },
      { id: 3, name: "Approved Ideas", path: isAdmin ? "/admin/approved-ideas" : "/approved-ideas" },
      { id: 5, name: "Team", path: "/team" },
    ];
  };

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

  return (
    <nav className="h-11 flex w-full justify-between items-center py-10">
      <div className="text-2xl text-white">
        <img src={opomIconUrl} onClick={() => navigate("/")} />
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
          <div className="text-white font-medium flex gap-x-2.5 items-center">
            {user?.profilePicture && (
              <img
                src={user?.profilePicture || UserImgUrl}
                className="size-9 rounded-full object-cover"
                alt="User profile"
              />
            )}

            <span>{user?.username || user?.email || "User"}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
