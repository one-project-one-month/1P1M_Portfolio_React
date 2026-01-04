import React, { useState } from "react";
import heartIcon from "@/assets/icons/Heart.png";
import activeHeartIcon from "@/assets/icons/ActiveHeart.png";
import eyeIcon from "@/assets/icons/eye.png";
import Button from "./Button";
import ProjectPortfolioDetail from "@/features/user/components/ProjectPortfolioDetail";

export default function ProjectCard({
  image,
  title,
  description,
  initialLikes = 0,
  initialViews = 0,

  onClickReact,
  project,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [viewCount] = useState(initialViews);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // const handleLikeClick = async () => {
  //   // Optimistically update the UI
  //   setLiked((prev) => !prev);
  //   setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

  //   try {
  //     const response = await onClickReact(project.id);

  //     // If backend says “already reacted” (409), that means user had liked before
  //     if (response?.status === 409) {
  //       console.log("ℹ️ Already reacted — reverting to unliked state");
  //       setLiked(false);
  //       setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
  //     }

  //     // If successful
  //     else if (response?.ok) {
  //       console.log("✅ React success");
  //     }

  //     // If other error
  //     else if (response && !response.ok) {
  //       throw new Error(`Server returned ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error reacting:", error);
  //     // Revert UI if something went wrong
  //     setLiked((prev) => !prev);
  //     setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
  //   }
  // };

  const handleViewClick = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="flex justify-center items-center border-box">
      <div
        className="
          w-[386px] h-[414px]
          flex flex-col items-center
          bg-[#000000]
          rounded-[12px]
          p-[24px]
          text-center
          border border-[#1A1A1A] 
          box-border
          shadow-sm
          gap-3
        "
      >
        {/* --- Image --- */}
        <div className="w-[320px] h-[132px] rounded-[8px] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* --- Content --- */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold leading-8 text-[#F9FAFB] font-sans">
            {title}
          </h1>
          <p className="text-[#99A1AF] font-light leading-5 text-sm font-sans max-w-[300px] h-[60px] overflow-hidden">
            {description}
          </p>
        </div>

        {/* --- Reactions --- */}
        <div className="flex items-center justify-center gap-4 mt-[11px]">
          {/* Like */}
          <button
            // onClick={toggleLike}
            onClick={onClickReact}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <img
              src={liked ? activeHeartIcon : heartIcon}
              alt="Like"
              className="w-[20px] h-[20px]"
            />
            <span className="text-[#99A1AF] text-sm font-sans ">
              {likeCount}
            </span>
          </button>

          {/* Views */}
          <div className="flex items-center gap-2">
            <img src={eyeIcon} alt="Views" className="w-[25px] h-[25px]" />
            <span className="text-[#99A1AF] text-sm font-sans ">
              {viewCount}
            </span>
          </div>
        </div>

        {/* --- Buttons --- */}
        <div className="flex justify-center gap-8 mt-[13px]">
          <Button variant="yellow_button" size="yellow_button">
            Preview
          </Button>

          <Button
            variant="purple_button"
            size="purple_button"
            onClick={handleViewClick}
          >
            View
          </Button>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectPortfolioDetail
        projectId={project?.id}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
