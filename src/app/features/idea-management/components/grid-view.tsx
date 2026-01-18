import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { COLORS } from '@/constants/colors';
import { Eye, Heart } from 'lucide-react';
import type { IdeaManagementTableProps } from '../types/idea-management.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const IdeaManagementGrid = ({
  // data,
  handleEdit,
  handleDelete,
  handleViewDetail,
  handleStatusChange,
  handleImportPortfolio,
}: IdeaManagementTableProps) => {
  return (
    <div className="grid grid-cols-3 auto-rows-fr gap-y-8 gap-x-12">
      {/* {data.map((idea) => ( */}
      <div
        className={`px-4 py-6 md:px-8 md:py-10 space-y-4 md:space-y-6 rounded-lg bg-[${COLORS.primary}]`}
      >
        {/* Title and status */}
        <div className="flex items-start md:items-center justify-between gap-2 md:gap-4">
          <h3 className="capitalize text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2 flex-1">
            {/* {idea.projectName} */}
            smart order & banking
          </h3>
          <span className="px-3 md:px-6 py-1 text-xs md:text-sm text-white rounded-md capitalize bg-[#00A63E] whitespace-nowrap">
            {/* {idea.status} */}
            approved
          </span>
        </div>

        {/* Desc */}
        <p className="line-clamp-3 text-sm md:text-base text-muted">
          {/* {idea.description} */}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          dignissimos officiis nobis beatae necessitatibus tenetur soluta
          sapiente explicabo minus voluptatem quasi mollitia perferendis
          voluptates blanditiis provident? Sapiente tempore similique impedit!
        </p>

        {/* Project types */}
        <div className="flex items-center justify-start gap-2 md:gap-x-4 flex-wrap">
          {/* {idea.projectTypes.map((item) => ( */}
          <span className="border border-black px-3 md:px-5 py-0.5 text-xs md:text-sm text-muted rounded-md capitalize">
            {/* {item} */}
            mobile
          </span>
          <span className="border border-black px-3 md:px-5 py-0.5 text-xs md:text-sm text-muted rounded-md capitalize">
            {/* {item} */}
            website
          </span>
          {/* ))} */}
        </div>

        {/* Submitter and leader */}
        <div className="flex items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-16">
          <div className="w-1/2 flex items-center justify-between gap-2">
            <span className="text-xs md:text-sm text-muted whitespace-nowrap">
              Submitter:
            </span>
            <img
              src={sampleUserImgUrl}
              alt="username"
              className="size-8 md:size-10 rounded-full shrink-0"
            />
          </div>
          <div className="w-1/2 flex items-center justify-between gap-2">
            <span className="text-xs md:text-sm text-muted whitespace-nowrap">
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
          <div className="w-1/2 flex items-center justify-start gap-4 md:gap-8">
            <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              {/* {idea.reaction_count} */}
              565
            </span>
            <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
              {/* TODO: change to dynamic count later */}
              <span>
                1.1 <span>K</span>
              </span>
            </span>
          </div>
          <div className="w-1/2 flex items-center justify-end">
            <ProjectIdeaDropDown
              type="grid"
              // data={data}
              handleEdit={handleEdit}
              handleViewDetail={handleViewDetail}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
              handleImportPortfolio={handleImportPortfolio}
            />
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default IdeaManagementGrid;
