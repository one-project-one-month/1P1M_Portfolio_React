import React from "react";
import Projectideaform from "../components/Projectideaform";
import Background from "../../../components/ui/Background";

const Projectideapage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      {" "}
      <div className="w-[727px] h-[512px] border border-[#1E2939] rounded-3xl">
        {" "}
        <Projectideaform />{" "}
      </div>{" "}
    </div>
  );
};

export default Projectideapage;
