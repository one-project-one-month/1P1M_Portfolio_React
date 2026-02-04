import { LightbulbOff } from 'lucide-react'; // Optional icon for empty state
import type { ProjectIdeaType } from '../../idea-management/types/project-idea.types';
import IdeaCard from './idea-card';

interface IdeaListProps {
  isLoading?: boolean;
  data: ProjectIdeaType[];
}

const IdeaList = ({ data, isLoading = false }: IdeaListProps) => {
  // Shared grid classes to ensure layout matches during loading and data states
  const gridClassName =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12';

  // 1. Loading State: Render multiple skeletons to mimic the grid
  if (isLoading) {
    return <h4 className="text-white">Loading....</h4>;
  }

  // 2. Empty State: Data is loaded but empty
  if (!isLoading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/50">
        <LightbulbOff size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">No project ideas found.</p>
        <p className="text-sm">Be the first to submit an idea!</p>
      </div>
    );
  }

  // 3. Success State: Render the actual cards
  return (
    <div className={gridClassName}>
      {data.map((idea: ProjectIdeaType) => (
        <IdeaCard idea={idea} key={idea.id} />
      ))}
    </div>
  );
};

export default IdeaList;
