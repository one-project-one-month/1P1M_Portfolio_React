import projectImage from '@/assets/ProjectImage.png';
import type { PortfolioProjectType } from '@/types/portfolio.type';
import { useHandleReact } from '../hooks/use-handle-react';
import ProjectCard from './project-card';

const ProjectList = ({
  projects,
  isLoading,
}: {
  projects: PortfolioProjectType[];
  isLoading: boolean;
}) => {
  console.log('Projects', projects);

  const { reactedProjects, handleReact } = useHandleReact(projects);

  console.log('Reacted', reactedProjects);

  if (isLoading) return <>Loading...</>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid auto-rows-fr gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reactedProjects.length > 0 ? (
          reactedProjects.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard
                image={project.projectPicUrl || projectImage}
                title={project.name}
                description={project.description}
                initialLikes={project.reaction_count || 0}
                initialViews={project.view_count || 0}
                onClickReact={() => handleReact(project.id)}
                project={project}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-white text-center text-lg">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
