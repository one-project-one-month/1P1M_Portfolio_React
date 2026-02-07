import type { ProjectIdeaType } from '../types/project-idea.types';
import ProjectIdeaCard from './project-idea-card';

const IdeaManagementGrid = ({ data }: { data: ProjectIdeaType[] }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
          {data.map((idea) => (
            <ProjectIdeaCard idea={idea} />
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No project ideas</p>
      )}
    </>
  );
};

export default IdeaManagementGrid;
