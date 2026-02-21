import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { getProjectPortfolioDetailsV2 } from '../../portfolio-management/services/portfolio-management-service';
import { mapApiToProjectData } from '../../portfolio-management/utils/helpers';
import ProjectPortfolioForm from './project-portfolio-form';

const PortfolioEditView = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        setIsLoading(true);
        const response = await getProjectPortfolioDetailsV2(projectId);
        if (response && response.data) {
          setProjectData(mapApiToProjectData(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch project', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSave = () => {
    navigate('/portfolios');
  };

  const handleCancel = () => {
    navigate('/portfolios');
  };

  if (isLoading) {
    return (
      <div className="h-60 text-white flex flex-col justify-center items-center">
        Loading Project...
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-white">
        <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
        <p className="text-white/60 mb-6">
          The project you're looking for doesn't exist.
        </p>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-[#9C39FC] hover:bg-[#9333ea] rounded-lg transition-colors"
        >
          Go Back to Portfolios
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <ProjectPortfolioForm
        mode="edit"
        initialData={projectData}
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </div>
  );
};

export default PortfolioEditView;
