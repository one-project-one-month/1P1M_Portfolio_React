import IconActiveHeart from '@/assets/icons/IconActiveHeart';
import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { cn } from '@/lib/utils';
import { useUserInfoStore } from '@/store/user-info-store';
import { Avatar, Tooltip } from '@radix-ui/themes';
import { ExternalLink, Eye, HeartIcon } from 'lucide-react';
import { ProjectIdeaDropDown } from '../../admin/components/project-idea-drop-down';
import { useUpdateViewCount } from '../hooks/use-update-view-count';
import { changeProjectIdeaStatus } from '../lib';
import { changeProjectIdeaStatusBgColor } from '../lib/idea-utils';
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
    dev_id,
    description = 'No description provided.',
    projectTypes = [],
    ownerProfilePicUrl,
    devUsername,
    reactionCount = 0,
    isAlreadyReacted,
  } = idea;

  const userInfo = useUserInfoStore((state) => state.userInfo);
  const { addToast } = useToast();

  const sortedProjectTypes = [...projectTypes].sort((a, b) =>
    a.localeCompare(b),
  );

  const { goTo } = useAppNavigation();

  const { displayIdea, handleViewDetail } = useUpdateViewCount(idea);

  return (
    <div className="bg-white/10 flex flex-col gap-y-2 p-5 backdrop-blur-xs text-white/70 w-full rounded-xl border border-white/5">
      <div className="flex justify-between items-center">
        <Tooltip content={projectIdeaName}>
          <h3 className="capitalize font-bold text-white flex-1 line-clamp-2">
            {projectIdeaName}
          </h3>
        </Tooltip>

        <span
          className={cn(
            'px-4 py-1 text-xs text-white rounded-md font-semibold whitespace-nowrap',
            changeProjectIdeaStatusBgColor(status),
          )}
        >
          {changeProjectIdeaStatus(status)}
        </span>
      </div>

      <p className="text-sm line-clamp-2 h-10 my-4">
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
          {/* <Avatar
            onClick={dev_id ? () => goTo(`/profile/${dev_id}`) : undefined}
            src={ownerProfilePicUrl || devUsername?.slice(0, 1)}
            radius="full"
            color="gray"
            className=" bg-gray-600! cursor-pointer"
            fallback={devUsername?.slice(0, 1)}
          /> */}

          <div
            onClick={() => {
              if (!userInfo) {
                addToast(
                  'You must Login to see the Profile Details',
                  'warning',
                );
                return;
              }
              goTo(`/profile/${dev_id}`);
            }}
            className="cursor-pointer ]"
          >
            <Avatar
              src={ownerProfilePicUrl}
              radius="full"
              color="gray"
              className=" bg-gray-600! cursor-pointer"
              fallback={devUsername?.[0]}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
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
            <span>{displayIdea?.viewCount}</span>
          </div>
        </div>

        {site === 'admin' ? (
          <ProjectIdeaDropDown type="grid" data={idea} />
        ) : (
          <ProjectIdeaDetailDialog
            count={displayIdea?.viewCount ?? 0}
            data={idea}
            trigger={
              <button
                onClick={handleViewDetail}
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
