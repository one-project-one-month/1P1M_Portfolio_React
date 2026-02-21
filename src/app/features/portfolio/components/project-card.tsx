import activeHeartIcon from '@/assets/icons/ActiveHeart.png';
import externalLinkImg from '@/assets/icons/external-link.svg';
import eyeIcon from '@/assets/icons/eye.png';
import heartIcon from '@/assets/icons/Heart.png';
import PjImage from '@/assets/project-image.png';
import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { ProjectData } from '../../portfolio-management/constants/data';
import {
  useReactProject,
  useUnreactProject,
} from '../../portfolio-management/hooks/use-portfolio-query';
import StatusTag from './status-tag';

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    id: projectId,
    image,
    title,
    leader,
    viewCount,
    reactCount: reactedCount,
    isReacted: isAlreadyReacted,
    status,
    members,
  } = project;

  const [isReacted, setIsReacted] = useState(isAlreadyReacted || false);
  const [reactCount, setReactCount] = useState(reactedCount || 0);
  const navigate = useNavigate();
  const displayMembers = members.slice(0, 3);
  const remainingCount = Math.max(0, members.length - 3);

  const reactMutation = useReactProject();
  const unreactMutation = useUnreactProject();

  const handleReactClick = () => {
    if (isReacted) {
      setIsReacted(false);
      setReactCount((prev) => Math.max(0, prev - 1));
      unreactMutation.mutate(projectId, {
        onError: () => {
          setIsReacted(true);
          setReactCount((prev) => prev + 1);
        },
      });
    } else {
      setIsReacted(true);
      setReactCount((prev) => prev + 1);
      reactMutation.mutate(projectId, {
        onError: () => {
          setIsReacted(false);
          setReactCount((prev) => Math.max(0, prev - 1));
        },
      });
    }
  };

  const allMembers = project.teams?.map((team) => team.members).flat() || [];

  return (
    <div className="flex justify-center items-center">
      <div className="w-full flex flex-col bg-[#FFFFFF17] backdrop-blur-md rounded-2xl p-[24px] border border-[#FFFFFF33] box-border shadow-sm gap-4">
        <div className="h-36.25 rounded-xl overflow-hidden">
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
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-between text-sm text-[#D1D5DC]">
              <span>Team Leader</span>
              <span className="font-medium">{leader}</span>
            </div>
            {allMembers.length > 0 && (
              <Flex
                align="center"
                justify="between"
                className="text-[#D1D5DC] font-light leading-5 text-sm font-sans"
              >
                <span>Team Members</span>
                <div className="flex -space-x-2">
                  {displayMembers.map((member, index) => (
                    <Link
                      key={member.id}
                      to={`/profile/${member.id}`}
                      state={{
                        devData: {
                          ...member,
                          profilePictureUrl: member.avatarUrl,
                        },
                      }}
                      className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-[#1F2937] bg-gray-300 block hover:z-50 hover:-translate-y-1 hover:scale-150 transition-all duration-200 ease-out cursor-pointer"
                      style={{ zIndex: displayMembers.length - index }}
                    >
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-400 text-[10px] font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </Link>
                  ))}
                  {remainingCount > 0 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111827] bg-gray-800 text-xs font-bold text-white">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              </Flex>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <StatusTag status={status} />
          <Flex gap="4">
            {/* Reaction Button */}
            <button
              onClick={handleReactClick}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <img
                src={isReacted ? activeHeartIcon : heartIcon}
                alt="Like"
                className="w-5 h-5"
              />
              <span className="text-[#99A1AF] text-sm font-sans">
                {reactCount}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <img src={eyeIcon} alt="Views" className="w-6.25 h-6.25" />
              <span className="text-[#99A1AF] text-sm font-sans">
                {viewCount}
              </span>
            </div>

            <img
              src={externalLinkImg}
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() =>
                navigate(`/portfolios/edit-portfolio/${project.id}`)
              }
            />
          </Flex>
        </div>
      </div>
    </div>
  );
}
