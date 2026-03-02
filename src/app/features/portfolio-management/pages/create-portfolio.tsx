import { useNavigate } from 'react-router-dom';
import PortfolioForm from '../components/portfolio-form';
import type { ProjectData } from '../constants/data';
import { useIdeaToPortfolioStore } from '@/store/idea-to-portfolio';

const CreatePortfolioPage = () => {
  const navigate = useNavigate();
  const portfolio = useIdeaToPortfolioStore((state) => state.portfolio);


  const handleSave = (data: Partial<ProjectData>) => {
    console.log('Creating project:', data);
    navigate('/admin/portfolio-management');
  };

  const handleCancel = () => {
    navigate('/admin/portfolio-management');
  };

  return (
    <div className="p-6 w-full h-full">
      <PortfolioForm
        isImport={portfolio ? true : false}
        importData={
          { projectName: portfolio?.name ?? '', description: portfolio?.desc ?? '', status: 'Planning' }
        }
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </div>
  );
};

export default CreatePortfolioPage;
