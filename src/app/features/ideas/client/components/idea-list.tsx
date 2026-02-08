import EmptyIdeasState from '../../shared/components/empty-ideas-state';
import IdeaCard from '../../shared/components/idea-card';
import type { IdeaType } from '../../shared/types/project-idea.types';

type Props = {
  isLoading?: boolean;
  data: IdeaType[];
};

const IdeaList = ({ data, isLoading = false }: Props) => {
  if (isLoading) {
    return <h4 className="text-white">Loading....</h4>;
  }

  if (!isLoading && data.length === 0) {
    return <EmptyIdeasState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12 w-full">
      {data.map((idea: IdeaType) => (
        <IdeaCard key={idea.projectIdeaId} site="client" idea={idea} />
      ))}
    </div>
  );
};

export default IdeaList;
