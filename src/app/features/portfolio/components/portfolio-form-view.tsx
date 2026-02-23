import { useNavigate } from 'react-router-dom';
import ProjectPortfolioForm from './project-portfolio-form';

const PortfolioFormview = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/portfolios');
  };

  const handleCancel = () => {
    navigate('/portfolios');
  };

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="absolute inset-0 bg-[#080D22]/50 backdrop-blur-xs" />
      <div className="relative z-10 flex min-h-[calc(100dvh-7rem)] w-full items-center justify-center overflow-y-auto p-4">
        <ProjectPortfolioForm
          mode="create"
          onSave={handleSave}
          onCancel={handleCancel}
          onClose={handleCancel}
        />
      </div>
    </div>
  );
};

export default PortfolioFormview;
