import IconActiveHeart from '@/assets/icons/IconActiveHeart';
import { cn } from '@/lib/utils';
import { Tooltip } from '@radix-ui/themes';
import { ExternalLink, Eye, HeartIcon } from 'lucide-react';
import { ProjectIdeaDropDown } from '../../admin/components/project-idea-drop-down';
import { changeProjectIdeaStatus, changeProjectIdeaStatusColor } from '../lib';
import type { IdeaType } from '../types/project-idea.types';
import ProjectIdeaDetailDialog from './project-idea-detail-dialog';

type Props = {
  site?: 'admin' | 'client';
  idea: IdeaType & { isAlreadyReacted: boolean };
  onReact?: (id: number, isReacted: boolean) => void;
  disableActions?: false;
};

export default function IdeaCard({
  site,
  idea,
  disableActions = false,
  onReact,
}: Props) {
  const {
    projectIdeaName = 'Untitled Project',
    status = 'PENDING',
    description = 'No description provided.',
    projectTypes = [],
    ownerProfilePicUrl,
    reactionCount = 0,
    viewCount = 0,
    isAlreadyReacted,
  } = idea;

  const sortedProjectTypes = [...projectTypes].sort((a, b) =>
    a.localeCompare(b),
  );

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

      <p className="text-sm line-clamp-2 h-16 leading-8">
        {description || 'No description provided.'}
      </p>

      <div className="flex items-center h-8 gap-x-1 flex-wrap">
        {sortedProjectTypes.length > 0 ? (
          sortedProjectTypes.map((ty) => (
            <div
              key={ty}
              className="text-xs capitalize border border-primary-custom px-2 p-1 rounded-md"
            >
              {ty}
            </div>
          ))
        ) : (
          <span className="text-xs text-white/40">No project type</span>
        )}
      </div>
      <div className="flex justify-between border-b py-4">
        <div className="flex text-sm items-center gap-x-2">
          <span>Submitter</span>
          <img
            className="aspect-square w-8 object-cover rounded-full"
            src={ownerProfilePicUrl}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            disabled={disableActions}
            onClick={() => onReact?.(idea.projectIdeaId, isAlreadyReacted)}
            className="flex text-xs items-center gap-x-2 hover:text-white transition disabled:opacity-50"
          >
            {isAlreadyReacted ? (
              <IconActiveHeart className="w-4 text-white" />
            ) : (
              <HeartIcon className="w-4" />
            )}
            <span>{reactionCount}</span>
          </button>

          <div className="flex text-xs items-center gap-x-2">
            <Eye className="w-4" />
            <span>{viewCount}</span>
          </div>
        </div>

        {site === 'admin' ? (
          <ProjectIdeaDropDown type="grid" data={idea} />
        ) : (
          <ProjectIdeaDetailDialog
            data={idea}
            trigger={
              <button
                type="button"
                className="text-white hover:text-[#A855F7] transition-colors"
              >
                <ExternalLink size={18} />
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
