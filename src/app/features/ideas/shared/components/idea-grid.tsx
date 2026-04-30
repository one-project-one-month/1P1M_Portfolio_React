import IdeaListCardSkeleton from '@/app/features/home/components/idea-list/idea-list-card-skeleton';
import { useToast } from '@/components/ui/toast-provider';
import { useUserInfoStore } from '@/store/user-info-store';
import { useCallback } from 'react';
import {
  useReactProjectIdea,
  useUnReactProjectIdea,
} from '../hooks/project-idea.query';
import type { IdeaType } from '../types/project-idea.types';
import { EmptyIdeasState, IdeaCard } from './';

type Props = {
  site: 'admin' | 'client';
  data: (IdeaType & { isAlreadyReacted: boolean })[];
  isLoading?: boolean;
};

const IdeaGrid = ({ site, data, isLoading = false }: Props) => {
  const user = useUserInfoStore((state) => state.userInfo);
  const { addToast } = useToast();

  const { mutate: react } = useReactProjectIdea();
  const { mutate: unreact } = useUnReactProjectIdea();

  const handleReactIdea = useCallback(
    (id: number, isReacted: boolean) => {
      if (!user) {
        addToast('Please log in', 'error');
        return;
      }
      if (isReacted) {
        unreact(id);
      } else {
        react(id);
      }
    },
    [user, addToast, react, unreact],
  );

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12 py-4">
        {Array.from({ length: 6 }).map((_, index) => {
          return <IdeaListCardSkeleton key={`idea-skeleton-${index}`} />;
        })}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyIdeasState />;
  }

  return (
    <div className="w-full mb-24  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12 py-4">
      {data.map((idea) => (
        <IdeaCard
          key={idea.projectIdeaId}
          site={site}
          idea={idea}
          onReact={handleReactIdea}
        />
      ))}
    </div>
  );
};

export default IdeaGrid;
