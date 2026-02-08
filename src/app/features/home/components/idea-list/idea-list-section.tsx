import { useGetProjectIdea } from '@/app/features/idea-management/hooks/use-project-ideas';
import type { ProjectIdeaType } from '@/app/features/idea-management/types/project-idea.types';
import { Link } from 'react-router-dom';
import IdeaListCard from './idea-list-card';
import IdeaListCardSkeleton from './idea-list-card-skeleton';

function IdeaListSection() {
  const { data, isLoading } = useGetProjectIdea({ page: 0 });

  const ideaLists = data?.data.slice(0, 6) ?? ([] as ProjectIdeaType[]);

  return (
    <section>
      <div className="w-full flex text-white justify-between items-end my-8 px-2">
        <div>
          <h2 className="text-3xl md:text-5xl mb-2 font-bold">Idea Lists</h2>
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
          ideaLists.map((idea) => <IdeaListCard key={idea.id} idea={idea} />)
        ) : (
          <div className="col-span-full text-center text-white/50 py-10">
            No project ideas available.
          </div>
        )}
      </div>
    </section>
  );
}

export default IdeaListSection;
