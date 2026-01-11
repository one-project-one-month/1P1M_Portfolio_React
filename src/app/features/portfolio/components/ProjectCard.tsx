import activeHeartIcon from '@/assets/icons/ActiveHeart.png';
import eyeIcon from '@/assets/icons/eye.png';
import heartIcon from '@/assets/icons/Heart.png';
import ProjectPortfolioDetail from '@/components/project-portfolio-detail';
import { Button } from '@/components/ui/button';
import type { ProjectCardType } from '@/types/portfolio.type';
import { useState } from 'react';

export default function ProjectCard({
  image,
  title,
  description,
  initialLikes = 0, // This is now a reactive prop
  initialViews = 0,
  onClickReact,
  project,
}: ProjectCardType) {
  const [liked, setLiked] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleLikeClick = () => {
    // Only trigger if not already liked locally
    if (!liked) {
      setLiked(true);
      onClickReact();
    }
  };

  return (
    <div className="flex justify-center items-center border-box">
      <div className="w-[386px] h-[414px] flex flex-col items-center bg-[#000000] rounded-[12px] p-[24px] text-center border border-[#1A1A1A] box-border shadow-sm gap-3">
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
          {/* Reaction Button */}
          <button
            onClick={handleLikeClick}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <img
              src={liked ? activeHeartIcon : heartIcon}
              alt="Like"
              className="w-[20px] h-[20px]"
            />
            <span className="text-[#99A1AF] text-sm font-sans">
              {/* DISPLAY PROP DIRECTLY */}
              {initialLikes}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <img src={eyeIcon} alt="Views" className="w-[25px] h-[25px]" />
            <span className="text-[#99A1AF] text-sm font-sans">
              {initialViews}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-[13px]">
          <Button variant="yellow_button" size="yellow_button">
            Preview
          </Button>
          <Button
            variant="purple_button"
            size="purple_button"
            onClick={() => setIsDetailOpen(true)}
          >
            View
          </Button>
        </div>
      </div>

      <ProjectPortfolioDetail
        projectId={project?.id}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
