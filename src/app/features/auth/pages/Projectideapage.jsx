import React from "react";
import { useLocation } from "react-router-dom";
import Projectideaform from "../components/Projectideaform";
import Background from "../../../components/ui/Background";

const Projectideapage = () => {
  const location = useLocation();
  const { isEditMode = false, projectIdeaData = null } = location.state || {};

  return (
    <div className="h-screen flex items-center justify-center">
      {" "}
      <div className="w-[727px] h-[512px] border border-[#1E2939] rounded-3xl">
        {" "}
        <Projectideaform
          isEditMode={isEditMode}
          existingProjectData={projectIdeaData}
        />{" "}
      </div>{" "}
    </div>
  );
};

export default Projectideapage;
