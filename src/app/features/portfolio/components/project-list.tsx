import projectImage from '@/assets/ProjectImage.png';
import type { PortfolioProjectType } from '@/types/portfolio.type';
import { List } from 'lucide-react';
import React from 'react';
import { useHandleReact } from '../hooks/use-handle-react';
import PortfolioCardSkeleton from './portfolio-card-skeleton';
import ProjectCard from './project-card';

const ProjectList = ({
  projects,
  isLoading,
}: {
  projects: PortfolioProjectType[];
  isLoading: boolean;
}) => {
  const { reactedProjects, handleReact } = useHandleReact(projects);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map(() => {
            return <PortfolioCardSkeleton />;
          })}
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {reactedProjects.length > 0 ? (
            reactedProjects.map((project) => (
              <React.Fragment
                key={`${project.id}-${projects.indexOf(project)}`}
              >
                <ProjectCard
                  image={project.projectPicUrl || projectImage}
                  title={project.name}
                  description={project.description}
                  initialLikes={project.reactedCount || 0}
                  initialViews={project.view_count || 0}
                  onClickReact={() => handleReact(project.id)}
                  project={project}
                />
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
