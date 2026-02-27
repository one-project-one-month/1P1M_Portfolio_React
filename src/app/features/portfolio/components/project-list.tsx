import { List } from 'lucide-react';
import React from 'react';
import type { ProjectData } from '../../portfolio-management/constants/data';
import PortfolioCardSkeleton from './portfolio-card-skeleton';
import ProjectCard from './project-card';

const ProjectList = ({
  projects,
  isLoading,
}: {
  projects: ProjectData[];
  isLoading: boolean;
}) => {
  return (
    <div className="w-full mb-4">
      {isLoading ? (
        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map(() => {
            return <PortfolioCardSkeleton />;
          })}
        </div>
      ) : (
        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {projects.length > 0 ? (
            projects.map((project) => (
              <React.Fragment
                key={`${project.id}-${projects.indexOf(project)}`}
              >
                <ProjectCard project={project} />
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-white/40">
              <List size={48} className="mb-4 opacity-60" />
              <p className="text-lg font-medium">No Portfolios yet</p>
              <p className="text-sm mt-2 text-white/30">
                Create a project portfolio.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
