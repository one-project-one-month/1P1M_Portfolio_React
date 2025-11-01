import React, { useState, useEffect } from "react";
import { opomIconUrl, UserImgUrl } from "@/assets/icons/iconUrls";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { getProfileData } from "@/services/profileDetailService";
//import axios from "axios";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const nav_links = [
        { id: 1, name: "Portfolio", path: "/Portfolios" },
        { id: 2, name: "Dev Profiles", path: "/Dev-Profiles" },
        { id: 3, name: "Ideas", path: "/Ideas" },
        { id: 4, name: "Approved Ideas", path: "/Approved-Ideas" },
        { id: 5, name: "Team", path: "/team" },
    ];

    // ✅ login check
    const token = localStorage.getItem("token");
    const isAuth = !!token;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                const userId = storedUser?.data?.[0]?.dev_id;
                if (!userId) {
                    console.warn(" No userId found in localStorage.");
                    return;
                }

                const data = await getProfileData(userId);
                setUser(data);
                //localStorage.setItem("user", JSON.stringify(data));
                console.log("User profile fetched:", data);
            } catch (error) {
                console.error(" Failed to load profile data:", error);
            }
        };

        if (isAuth) {
            fetchProfile();
        }
    }, [isAuth]);

    const handleToggle = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSignOut = () => {
        // ✅ remove token
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
        navigate("/");
        console.log("User Log Out Successfully ! ");
    };

    const handleSelect = (action) => {
        if (action === "Sign Out") {
            handleSignOut();
        } else if (action === "View Profile") {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const userId = storedUser?.data?.[0]?.dev_id;
            if (userId) {
                navigate(`/profile-detail/${userId}`); // ✅ navigate to profile detail page
            } else {
                console.error("User ID not found. Cannot navigate to detail page.");
            }
        }
        setIsDropdownOpen(false);
    };

    const handleCreateAccount = () => {
        navigate("/login");
    };

    return (
        <nav className="h-11 flex w-full justify-between items-center py-10">
            {/* LOGO */}
            <div className="text-2xl text-white">
                <img src={opomIconUrl} alt="Logo" />
            </div>

            {/* nav_links */}
            <div className="font-medium flex gap-x-10 p-1">
                {nav_links.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        className={({ isActive }) =>
                            `${isActive ? "text-white" : "text-[#ADADADA3]"}`
                        }
                    >
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </div>

            {/* create account btn or user profile */}
            <div className="relative">
                {!isAuth ? (
                    <Button variant="secondary" size="primary" onClick={handleCreateAccount} >
                        Create Account
                    </Button>
                ) : (
                    <button
                        onClick={handleToggle}
                        className="flex items-center gap-x-2.5 text-white font-medium focus:outline-none"
                    >
                        <img
                            src={user?.profileImage || UserImgUrl}
                            alt="User"
                            className="size-9 rounded-full border border-gray-300"
                        />
                        <span>{user?.name || "User"}</span>
                    </button>
                )}

                {/* --- Dropdown Menu --- */}
                {isDropdownOpen && (
                    <div
                        className="absolute right-0 mt-3 w-48 bg-[#090E23] backdrop-blur-xl text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden z-10"
                    >
                        {["View Profile", "Sign Out"].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="w-full text-left px-4 py-2.5 text-gray-200 hover:bg-white/10 transition-colors duration-150 flex items-center gap-2 border border-[#99A1AF] rounded-lg"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
