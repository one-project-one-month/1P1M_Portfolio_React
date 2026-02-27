import { useGetProjectIdea } from '@/app/features/ideas/shared/hooks';
import {
  useReactProjectIdea,
  useUnReactProjectIdea,
} from '@/app/features/ideas/shared/hooks/project-idea.query';
import type { IdeaType } from '@/app/features/ideas/shared/types/project-idea.types';
import { LightbulbOff } from 'lucide-react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import IdeaListCard from './idea-list-card';
import IdeaListCardSkeleton from './idea-list-card-skeleton';

function IdeaListSection() {
  const { data, isLoading } = useGetProjectIdea({ page: 0 });

  const { mutate: react } = useReactProjectIdea();
  const { mutate: unreact } = useUnReactProjectIdea();

  const ideaLists = (data?.data.slice(0, 6) ?? []) as (IdeaType & {
    isAlreadyReacted: boolean;
  })[];

  const handleReactIdea = useCallback(
    (id: number, isReacted: boolean) => {
      if (isReacted) unreact(id);
      else react(id);
    },
    [react, unreact],
  );

  return (
    <section>
      <div className="w-full flex text-white justify-between items-end my-8 px-2">
        <div>
          <h2 className="text-3xl md:text-5xl mb-2 font-bold">Project Ideas</h2>
          <div className="w-1/2 h-2 rounded-full bg-primary-custom"></div>
        </div>

        <Link
          to="/ideas"
          className="border-b border-transparent hover:border-gray-200 transition-colors cursor-pointer text-sm md:text-base pb-1"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <IdeaListCardSkeleton key={i} />
          ))
        ) : ideaLists.length > 0 ? (
          ideaLists.map((idea) => (
            <IdeaListCard
              key={idea.projectIdeaId}
              idea={idea}
              onReact={handleReactIdea}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-white/40">
            <LightbulbOff size={48} className="mb-4 opacity-60" />
            <p className="text-lg font-medium">No ideas yet</p>
            <p className="text-sm mt-2 text-white/30">
              Be the first to submit a project idea.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default IdeaListSection;
