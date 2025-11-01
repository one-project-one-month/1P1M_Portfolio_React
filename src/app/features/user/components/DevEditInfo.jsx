import React from "react";
import Button from "@/components/ui/Button";
import EditIcon from "@/assets/icons/edit.png";

const AboutInfo = ({ profile }) => {
    if (!profile) return null;

    return (
        <div className="bg-[#000000] rounded-3xl backdrop-blur-md flex justify-between items-center px-8 py-6 shadow-lg">
            <div className="flex items-center gap-6">
                <img
                    src={profile.profilePictureUrl || "https://i.pravatar.cc/120"}
                    alt="Profile"
                    className="w-28 h-28 rounded-xl object-cover"
                />
                <div>
                    <h2 className="text-[#F9FAFB] text-[16px] font-semibold">{profile.name}</h2>
                    <div className="mt-3 space-y-1 text-[#6A7282] text-xs">
                        <p>{profile.email}</p>
                        <p>@{profile.telegram || profile.username}</p>
                    </div>
                </div>
            </div>
            <Button
                variant="primary"
                size="primary"
                className="flex items-center gap-2 hover:bg-[#8A2BE2] transition-colors font-medium px-4 py-2 rounded-lg"
            >
                <img src={EditIcon} alt="edit" className="w-5 h-5" /> Edit Profile
            </Button>
        </div>
    );
};

export default AboutInfo;
