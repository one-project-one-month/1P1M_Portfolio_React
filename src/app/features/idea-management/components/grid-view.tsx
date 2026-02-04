import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { Tooltip } from '@radix-ui/themes';
import { Eye, Heart } from 'lucide-react';
import {
  changeProjectIdeaStatus,
  changeProjectIdeaStatusColor,
} from '../lib/utils';
import type { ProjectIdeaType } from '../types/project-idea.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const IdeaManagementGrid = ({ data }: { data: ProjectIdeaType[] }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
          {data.map((idea) => (
            <div
              key={idea.id}
              className="px-8 py-6 space-y-4 md:space-y-6 rounded-xl bg-[#FFFFFF1A] border border-[#FFFFFF1A] backdrop-blur-md"
            >
              {/* Title and status */}
              <div className="flex items-start justify-between gap-2 md:gap-4">
                <Tooltip content={idea.projectIdeaName}>
                  <h3 className="capitalize text-lg md:text-xl font-bold text-white flex-1 line-clamp-2">
                    {idea.projectIdeaName}
                  </h3>
                </Tooltip>
                <span
                  className={cn(
                    'px-4 py-1 text-xs md:text-sm text-white rounded-md font-semibold whitespace-nowrap',
                    changeProjectIdeaStatusColor(idea.status),
                  )}
                >
                  {changeProjectIdeaStatus(idea.status)}
                </span>
              </div>

              {/* Desc */}
              <p className="line-clamp-2 text-sm md:text-base text-muted">
                {idea.description}
              </p>

              {/* Project types */}
              <div className="flex items-center justify-start gap-2 md:gap-x-4 flex-wrap">
                {idea.projectTypes.map((item) => (
                  <span
                    className={`border border-[${COLORS.primary}]! px-3 py-1 md:px-5 py-0.5 text-xs md:text-sm text-muted rounded-md capitalize`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Submitter and leader */}
              <div className="flex items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-16 mt-10">
                <div className="w-1/2 flex items-center justify-start gap-4">
                  <span className="text-sm md:text-lg text-muted whitespace-nowrap">
                    Submitter:
                  </span>
                  <img
                    src={sampleUserImgUrl}
                    alt="username"
                    className="size-8 md:size-10 rounded-full shrink-0"
                  />
                </div>
                <div className="w-1/2 flex items-center justify-end gap-4">
                  <span className="text-sm md:text-lg text-muted whitespace-nowrap">
                    Leader:
                  </span>
                  <img
                    src={sampleUserImgUrl}
                    alt="username"
                    className="size-8 md:size-10 rounded-full shrink-0"
                  />
                </div>
              </div>

              <hr />

              {/* Like, view and edit */}
              <div className="flex items-center justify-between p-1 md:p-2">
                <div className="w-1/2 flex items-center justify-start gap-2 md:gap-6">
                  <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
                    <Heart size={25} />
                    {idea.reaction_count}
                  </span>
                  <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
                    <Eye size={25} />
                    {/* TODO: change to dynamic count later */}
                    <span>
                      1.1<span>K</span>
                    </span>
                  </span>
                </div>
                <div className="w-1/2 flex items-center justify-end">
                  <ProjectIdeaDropDown type="grid" data={idea} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No project ideas</p>
      )}
    </>
  );
};

export default IdeaManagementGrid;
