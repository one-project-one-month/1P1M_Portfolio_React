import type { IdeaType } from '../types/project-idea.types';
import { EmptyIdeasState, IdeaCard } from './';

type Props = {
  site: 'admin' | 'client';
  data: IdeaType[];
  isLoading?: boolean;
};

const IdeaGrid = ({ site, data, isLoading = false }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <h4 className="text-white text-xl">Loading....</h4>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyIdeasState />;
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
      {data.map((idea) => (
        <IdeaCard key={idea.projectIdeaId} site={site} idea={idea} />
      ))}
    </div>
  );
};

export default IdeaGrid;
