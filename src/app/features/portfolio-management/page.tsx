import { PortfolioHeader } from './components/portfolio-header';
import { ProjectCard } from './components/project-card';
import { MOCK_PROJECTS } from './constants';
const PortfolioManagementPage = () => {
  return (
    <div className="min-h-screen text-white">
      <PortfolioHeader />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-6 border border-white/20 py-12 px-6 bg-[#FFFFFF17] rounded-lg">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            image={project.image}
            title={project.title}
            teamLeader={project.teamLeader}
            members={project.members}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioManagementPage;
