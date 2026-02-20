import { useNavigate } from 'react-router-dom';
import type { ProjectData } from '../../portfolio-management/constants/data';
import ProjectPortfolioForm from './project-portfolio-form';

const PortfolioFormview = () => {
  const navigate = useNavigate();

  const handleSave = (data: Partial<ProjectData>) => {
    console.log('Creating project:', data);
    navigate('/portfolios');
  };

  const handleCancel = () => {
    navigate('/portfolios');
  };

  return (
    <div className="flex justify-center items-center">
      <ProjectPortfolioForm
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </div>
  );
};

export default PortfolioFormview;
