import type { ProjectData } from '../../portfolio-management/constants/data';
import { useCreatePortfolio } from '../hooks/use-create-portfolio';
import UserPortfolioForm from './user-portfolio-form';

const PortfolioFormview = () => {
  const { mutate } = useCreatePortfolio();
  const handleSave = (values: Partial<ProjectData>) => {
    // console.log(values);
    const payload = {
      ...values,
    };
    mutate(payload);
  };

  const handleCancel = () => {};

  return (
    <div className="flex justify-center items-center">
      <UserPortfolioForm
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </div>
  );
};

export default PortfolioFormview;
