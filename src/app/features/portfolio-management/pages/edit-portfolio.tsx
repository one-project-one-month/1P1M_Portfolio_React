import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioForm from '../components/portfolio-form';
import type { ProjectData } from '../constants/data';
import { getProjectPortfolioDetailsV2 } from '../services/portfolio-management-service';
import { mapApiToProjectData } from '../utils/helpers';

const EditPortfolioPage = () => {
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

  const handleSave = (data: Partial<ProjectData>) => {
    console.log('Saving project:', data);
    navigate('/admin/portfolio-management');
  };

  const handleCancel = () => {
    navigate('/admin/portfolio-management');
  };

  if (isLoading) {
    return <div className="p-6 text-white">Loading...</div>;
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
          Go Back to Portfolio Management
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 w-full h-full">
      <PortfolioForm
        isImport={false}
        mode="edit"
        initialData={projectData}
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </div>
  );
};

export default EditPortfolioPage;
