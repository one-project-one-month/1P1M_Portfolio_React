import activeHeartIcon from '@/assets/icons/ActiveHeart.png';
import externalLinkImg from '@/assets/icons/external-link.svg';
import eyeIcon from '@/assets/icons/eye.png';
import heartIcon from '@/assets/icons/Heart.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import PjImage from '@/assets/project-image.png';
import type { ProjectCardType } from '@/types/portfolio.type';
import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusTag from './status-tag';

export default function ProjectCard({
  image,
  title,
  initialLikes = 0,
  initialViews = 0,
  onClickReact,
  project,
}: ProjectCardType) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLikeClick = () => {
    // Only trigger if not already liked locally
    if (!liked) {
      setLiked(true);
      onClickReact();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full flex flex-col bg-[#FFFFFF17] backdrop-blur-md rounded-[12px] p-[24px] border border-[#FFFFFF33] box-border shadow-sm gap-4">
        <div className="h-[145px] rounded-[8px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = PjImage;
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold leading-5 mb-2 text-white font-sans">
            {title}
          </h1>
          <Flex className="text-[#D1D5DC] font-light leading-5 text-sm font-sans">
            <span>Team Leader</span>
            <span></span>
          </Flex>
          <Flex
            align="center"
            justify="between"
            className="text-[#D1D5DC] font-light leading-5 text-sm font-sans"
          >
            <span>Team Members</span>
            <div className="flex -space-x-2">
              {project.teams[0]?.members?.slice(0, 3).map((member, index) => (
                <img
                  key={`${member.id}-${index}`}
                  src={member.profilePictureUrl || sampleUserImgUrl}
                  alt={member.name}
                  className="h-7 w-7 rounded-full border-2 border-[#111827] object-cover"
                />
              ))}
              {project.teams.members && project.teams.members.length > 3 && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#111827] bg-gray-800 text-xs font-bold text-white">
                  +{project.teams.members.length - 3}
                </div>
              )}
            </div>
          </Flex>
        </div>

        <div className="flex items-center justify-between">
          <StatusTag status={'Complete'} />
          <Flex gap="4">
            {/* Reaction Button */}
            <button
              onClick={handleLikeClick}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <img
                src={liked ? activeHeartIcon : heartIcon}
                alt="Like"
                className="w-5 h-5"
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

            <img
              src={externalLinkImg}
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() =>
                navigate(`/portfolio/update-portfolio/${project?.id}`, {
                  state: { projectDetailData: project },
                })
              }
            />
          </Flex>
        </div>
      </div>
    </div>
  );
}
