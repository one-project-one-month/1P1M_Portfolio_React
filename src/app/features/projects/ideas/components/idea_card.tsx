import { Button } from '@/components/ui/button';
import type { Idea } from '@/types/project';
import { Edit, Eye, Heart, Trash } from '@mynaui/icons-react';
const IdeaCard = ({ project }: { project: Idea }) => {
  return (
    <div className="w-full h-[298px] bg-[#030712] flex flex-col justify-center items-center gap-4 border border-white/20 text-white text-center rounded-xl p-7">
      <div className="h-full flex flex-col gap-3.5 items-center">
        <div className="w-full h-full">
          <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
          <p
            className="text-sm font-light text-center tracking-normal leading-5 text-gray-400 "
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {project.projectTypes.map((tagName, idx) => (
            <Button
              key={idx}
              type="submit"
              className="h-7 text-sm cursor-pointer bg-[#B58400] hover:bg-[#B58400] px-6"
              variant="primary"
              size="secondary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className="flex items-center justify-center">{tagName}</div>
            </Button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2">
          <p className="text-[#6A7282]">Submitted by: </p>
          <div className="flex items-center gap-2">
            <img
              src={project.profilePictureUrl}
              className="w-8 h-8 rounded-full"
              alt="user"
            />
            <p>{project.devName}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex justify-between items-center gap-2">
              <Heart />
              <p>{project.reactionCount}</p>
            </div>
            <div className="flex justify-between items-center gap-3">
              <Eye />
              <p>{project.reactionCount}K</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Edit />
            <Trash className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
