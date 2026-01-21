import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioForm from '../components/portfolio-form';
import { PORTFOLIO_MANAGEMENT_DATA, type ProjectData } from '../constants/data';

const EditPortfolioPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [projects] = useState(PORTFOLIO_MANAGEMENT_DATA);

  const projectData = useMemo(() => {
    const id = parseInt(projectId || '0');
    return projects.find((p) => p.id === id) || null;
  }, [projectId, projects]);

  const handleSave = (data: Partial<ProjectData>) => {
    console.log('Saving project:', data);
    navigate('/admin/portfolio-management');
  };

  const handleCancel = () => {
    navigate('/admin/portfolio-management');
  };

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
