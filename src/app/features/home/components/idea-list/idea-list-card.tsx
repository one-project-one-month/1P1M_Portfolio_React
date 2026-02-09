import {
  changeProjectIdeaStatus,
  changeProjectIdeaStatusColor,
} from '@/app/features/idea-management/lib/utils';
import type { ProjectIdeaType } from '@/app/features/idea-management/types/project-idea.types';
import sampleImg from '@/assets/sample-user-img.jpg';
import Tooltip from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ExternalLink, Eye, HeartIcon } from 'lucide-react';

type IdeaListCardProps = {
  idea?: ProjectIdeaType | null;
  onReact?: (idea: ProjectIdeaType) => void;
  onViewDetail?: (idea: ProjectIdeaType) => void;
  disableActions?: boolean;
};

function IdeaListCard({
  idea,
  onReact,
  onViewDetail,
  disableActions = false,
}: IdeaListCardProps) {
  if (!idea) {
    return (
      <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-sm text-white/50">
        No project idea data available.
      </div>
    );
  }

  const {
    projectIdeaName = 'Untitled Project',
    status = 'PENDING',
    description = 'No description provided.',
    projectTypes = [],
    ownerProfilePicUrl,
    leaderProfilePicUrl,
    reactionCount = 0,
    viewCount = 0,
  } = idea;

  return (
    <div className="bg-white/10 flex flex-col gap-2 p-5 backdrop-blur-xs text-white/70 w-full rounded-xl border border-white/5">
      <div className="flex justify-between items-center">
        <Tooltip content={projectIdeaName}>
          <h3 className="capitalize font-bold text-white flex-1 line-clamp-2">
            {projectIdeaName}
          </h3>
        </Tooltip>

        <span
          className={cn(
            'px-4 py-1 text-xs text-white rounded-md font-semibold whitespace-nowrap',
            changeProjectIdeaStatusColor(status),
          )}
        >
          {changeProjectIdeaStatus(status)}
        </span>
      </div>

      <p className="text-sm line-clamp-2 h-10">
        {description || 'No description provided.'}
      </p>

      <div className="flex items-center h-8 gap-x-1 flex-wrap">
        {projectTypes.length > 0 ? (
          projectTypes.map((ty) => (
            <div
              key={ty}
              className="text-xs border border-primary-custom px-2 p-1 rounded-md"
            >
              {ty}
            </div>
          ))
        ) : (
          <span className="text-xs text-white/40">No project type</span>
        )}
      </div>
      <div className="flex justify-between border-b py-4">
        {[
          { label: 'Submitter', url: ownerProfilePicUrl },
          { label: 'Leader', url: leaderProfilePicUrl },
        ].map(({ label, url }) => (
          <div key={label} className="flex text-sm items-center gap-x-2">
            <span>{label}</span>
            <img
              className="aspect-square w-6 object-cover rounded-full"
              src={url || sampleImg}
              alt={label}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            disabled={disableActions}
            onClick={() => onReact?.(idea)}
            className="flex text-xs items-center gap-x-2 hover:text-white transition disabled:opacity-50"
          >
            <HeartIcon className="w-4" />
            <span>{reactionCount}</span>
          </button>

          <div className="flex text-xs items-center gap-x-2">
            <Eye className="w-4" />
            <span>{viewCount}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={disableActions}
          onClick={() => onViewDetail?.(idea)}
          className="hover:text-white transition disabled:opacity-50"
        >
          <ExternalLink className="w-4" />
        </button>
      </div>
    </div>
  );
}

export default IdeaListCard;
