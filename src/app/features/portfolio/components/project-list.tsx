import projectImage from '@/assets/ProjectImage.png';
import SkeletonCard from '@/components/ui/skeleton-card';
import type { PortfolioProjectType } from '@/types/portfolio.type';
import React from 'react';
import { useHandleReact } from '../hooks/use-handle-react';
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
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
          {reactedProjects.length > 0 ? (
            reactedProjects.map((project) => (
              <React.Fragment
                key={`${project.id}-${projects.indexOf(project)}`}
              >
                <ProjectCard
                  image={project.projectPicUrl || projectImage}
                  title={project.name}
                  description={project.description}
                  initialLikes={project.reaction_count || 0}
                  initialViews={project.view_count || 0}
                  onClickReact={() => handleReact(project.id)}
                  project={projects}
                />
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-white text-center text-lg">
                No projects found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
