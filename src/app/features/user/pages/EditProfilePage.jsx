import React from "react";
import { useLocation } from "react-router-dom";
import DevProfileForm from "@/features/auth/components/DevProfileForm";

const EditProfilePage = () => {
  const location = useLocation();
  const profileData = location.state?.profileData;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <DevProfileForm isEditMode={true} existingProfileData={profileData} />
    </div>
  );
};

export default EditProfilePage;
