import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { useUserInfoStore } from '@/store/user-info-store';
import { Tooltip } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExternalLink, Eye, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProjectIdeaDropDown } from '../../admin/components/project-idea-drop-down';
import { changeProjectIdeaStatus, changeProjectIdeaStatusColor } from '../lib';
import {
  reactProjectIdea,
  unreactProjectIdea,
} from '../services/project-idea.service';
import type { IdeaType } from '../types/project-idea.types';
import ProjectIdeaDetailDialog from './project-idea-detail-dialog';

type Props = {
  site?: 'admin' | 'client';
  idea: IdeaType;
};

export default function IdeaCard({ site, idea }: Props) {
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfoStore();

  // Initialize reaction state from localStorage
  const [isReacted, setIsReacted] = useState(() => {
    if (!userInfo?.userId) return false;
    const storageKey = `reactions_user_${userInfo.userId}`;
    const reactions = localStorage.getItem(storageKey);
    if (!reactions) return false;
    try {
      const parsed: Record<number, boolean> = JSON.parse(reactions);
      return parsed[idea.projectIdeaId] === true;
    } catch {
      return false;
    }
  });
  const [reactionCount, setReactionCount] = useState(idea.reactionCount);

  // Sync reaction state to localStorage
  useEffect(() => {
    if (!userInfo?.userId) return;

    const storageKey = `reactions_user_${userInfo.userId}`;
    const reactions = localStorage.getItem(storageKey);
    let parsed: Record<number, boolean> = {};

    if (reactions) {
      try {
        parsed = JSON.parse(reactions);
      } catch {
        parsed = {};
      }
    }

    if (isReacted) {
      parsed[idea.projectIdeaId] = true;
    } else {
      delete parsed[idea.projectIdeaId];
    }

    localStorage.setItem(storageKey, JSON.stringify(parsed));
  }, [isReacted, idea.projectIdeaId, userInfo?.userId]);

  // React
  const { mutate: react, isPending: isReacting } = useMutation({
    mutationFn: () => reactProjectIdea(idea.projectIdeaId),
    onSuccess: () => {
      setIsReacted(true);
      setReactionCount((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
    onError: (error) => {
      console.error('Failed to react:', error);
    },
  });

  // Unreact
  const { mutate: unreact, isPending: isUnreacting } = useMutation({
    mutationFn: () => unreactProjectIdea(idea.projectIdeaId),
    onSuccess: () => {
      setIsReacted(false);
      setReactionCount((prev) => Math.max(0, prev - 1));
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
    onError: (error) => {
      console.error('Failed to unreact:', error);
    },
  });

  const handleReactionToggle = () => {
    if (!userInfo) {
      // Optionally show a login prompt or toast
      return;
    }

    if (isReacting || isUnreacting) return;

    if (isReacted) {
      unreact();
    } else {
      react();
    }
  };
  return (
    <div className="px-8 py-6 space-y-4 md:space-y-6 rounded-xl bg-[#FFFFFF1A] border border-[#FFFFFF1A] backdrop-blur-md">
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
            key={item}
            className={`border border-[${COLORS.primary}]! px-3 py-1 md:px-5 text-xs md:text-sm text-muted rounded-md capitalize`}
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
            src={idea.ownerProfilePicUrl}
            alt={idea.devName}
            className="size-8 md:size-10 rounded-full shrink-0"
          />
        </div>
      </div>

      <hr />

      {/* Like, view and edit */}
      <div className="flex items-center justify-between p-1 md:p-2">
        <div className="w-1/2 flex items-center justify-start gap-2 md:gap-6">
          <button
            type="button"
            onClick={handleReactionToggle}
            disabled={isReacting || isUnreacting || !userInfo}
            className={cn(
              'flex items-center gap-1 md:gap-2 text-sm md:text-base transition-colors',
              isReacted
                ? 'text-red-500 hover:text-red-600'
                : 'text-muted hover:text-red-500',
              (!userInfo || isReacting || isUnreacting) &&
                'opacity-50 cursor-not-allowed',
            )}
          >
            <Heart size={25} className={cn(isReacted && 'fill-current')} />
            {reactionCount}
          </button>
          <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
            <Eye size={25} />
            {idea.viewCount}
          </span>
        </div>
        <div className="w-1/2 flex items-center justify-end">
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
                  <ExternalLink size={25} />
                </button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
