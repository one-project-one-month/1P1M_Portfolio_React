import EmptyIdeasState from '../../shared/components/empty-ideas-state';
import IdeaCard from '../../shared/components/idea-card';
import type { IdeaType } from '../../shared/types/project-idea.types';

const IdeaManagementGrid = ({ data }: { data: IdeaType[] }) => {
  if (!data || data.length === 0) {
    return <EmptyIdeasState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
      {data.map((idea) => (
        <IdeaCard key={idea.projectIdeaId} site="admin" idea={idea} />
      ))}
    </div>
  );
};

export default IdeaManagementGrid;
