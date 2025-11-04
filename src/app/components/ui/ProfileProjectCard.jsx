import React, { useState } from "react";
import heartIcon from "@/assets/icons/Heart.png";
import activeHeartIcon from "@/assets/icons/ActiveHeart.png";
import eyeIcon from "@/assets/icons/eye.png";
import Button from "./Button";
import ProjectPortfolioDetail from "@/features/user/components/ProjectPortfolioDetail";

export default function ProfileProjectCard({
  image,
  title,
  description,
  initialLikes = 0,
  initialViews = 0,
  onClickReact,
  onEdit,
  onDelete,
  project,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [viewCount] = useState(initialViews);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleLikeClick = async () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      const response = await onClickReact(project.id);

      if (response?.status === 409) {
        console.log("ℹ️ Already reacted — reverting to unliked state");
        setLiked(false);
        setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (response?.ok) {
        console.log("✅ React success");
      } else if (response && !response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Error reacting:", error);
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  const handleViewClick = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleEditClick = () => {
    onEdit && onEdit(project);
  };

  const handleDeleteClick = () => {
    onDelete && onDelete(project);
  };

  return (
    <div className="flex justify-center items-center border-box">
      <div
        className="
          max-w-[386px] h-[414px]
          flex flex-col items-center
          bg-[#000000]
          rounded-[12px]
          p-[24px]
          text-center
          border border-[#1A1A1A] 
          box-border
          shadow-sm
          gap-3
          relative
        "
      >
        <div className="w-[320px] h-[132px] rounded-[8px] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold leading-8 text-[#F9FAFB] font-sans">
            {title}
          </h1>
          <p className="text-[#99A1AF] font-light leading-5 text-sm font-sans max-w-[300px] h-[60px] overflow-hidden">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-[11px]">
          <button
            onClick={handleLikeClick}
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

          <div className="flex items-center gap-2">
            <img src={eyeIcon} alt="Views" className="w-[25px] h-[25px]" />
            <span className="text-[#99A1AF] text-sm font-sans ">
              {viewCount}
            </span>
          </div>

          {onEdit && (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              title="Edit project"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 21H20.5"
                  stroke="#99A1AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.37437 12.8357C5.89453 13.3162 5.625 13.9675 5.625 14.6466V18.25H9.25043C9.93016 18.25 10.582 17.9799 11.0626 17.499L19.7499 8.80554C20.75 7.80489 20.75 6.18298 19.7499 5.18233L18.6942 4.12595C17.6932 3.12441 16.0698 3.12472 15.0692 4.12664L6.37437 12.8357Z"
                  stroke="#99A1AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDeleteClick}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              title="Delete project"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.07153 8.64282L7.35725 21.5H16.643L17.9287 8.64282"
                  stroke="#82181A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.1875 16.4375V10.8125"
                  stroke="#82181A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8125 16.4375V10.8125"
                  stroke="#82181A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.14282 6.07143H9.2857M9.2857 6.07143L9.7155 4.35215C9.8407 3.85133 10.2907 3.5 10.8069 3.5H14.193C14.7092 3.5 15.1592 3.85133 15.2844 4.35215L15.7143 6.07143M9.2857 6.07143H15.7143M15.7143 6.07143H20.8571"
                  stroke="#82181A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

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

      <ProjectPortfolioDetail
        projectId={project?.id}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
