import DevProfile from "@/components/ui/DevProfile";
import React from "react";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";

const DevRegisterSection = ({
  devsLoading,
  DevProfileDatas = [],
  devsError,
}) => {
  const navigate = useNavigate();

  
  const handleProfileView = (devId) => {
    const devData = DevProfileDatas.data.find((dev) => dev.dev_id === devId);
    if (!devData) return;

    const username = devData.email.split("@")[0];
    navigate(`/profile/${username}`, { state: { devData } });
  };

  const renderError = () => {
    return (
      <div className="col-span-full text-red-400 py-8 text-center text-lg">
        Failed to load developer profiles.
        <div className="mt-2 text-sm text-gray-400">
          {devsError?.message || "Something went wrong."}
        </div>
      </div>
    );
  };

  const renderDevs = () => {
    return DevProfileDatas.data.slice(0, 6).map((devProfile) => (
      <DevProfile devProfile={devProfile} key={devProfile.dev_id} viewProfile={()=>handleProfileView(devProfile.dev_id)} />
    ));
  };

  return (
    <section className="flex flex-col justify-center text-center text-[#E5E7EB] mb-8">
      <div className="w-full flex justify-between items-center my-8">
        <h1 className="text-5xl">Dev Profile</h1>
        <button
          className="border-b cursor-pointer"
          onClick={() => navigate("/dev-list")}
        >
          View more
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4">
        {devsError ? (
          renderError()
        ) : devsLoading ? (
          <SkeletonCard />
        ) : (
          renderDevs()
        )}
      </div>
    </section>
  );
};

export default DevRegisterSection;
