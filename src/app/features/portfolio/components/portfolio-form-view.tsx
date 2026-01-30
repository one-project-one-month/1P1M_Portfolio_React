import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { useCreatePortfolio } from '../hooks/use-create-portfolio';
import ProjectPortfolioForm from './project-portfolio-form';

const PortfolioFormview = () => {
  const [repoLink, setRepoLink] = useState('');
  const navigate = useNavigate();

  const { mutate } = useCreatePortfolio();

  const handleSave = (values: Partial<ProjectData>) => {
    const payload = {
      name: values.projectName || '',
      image: values.image || '',
      description: values.description || '',
      projectLink: values.projectLink || '',
      repoLink: repoLink,
      startDate: values.startDate || '',
      completedDate: values.completedDate || '',
      status: values.status || 'Pending',
      languageAndTools:
        values.technologies?.map((tech) => ({
          name: tech.languages || '',
          type: tech.projectType?.name || 'Other',
        })) || [],
      teamIds: values.members?.map((team) => team.id) || [],
    };

    mutate(payload);
    navigate('/portfolio');
  };

  const handleCancel = () => {
    navigate('/portfolio');
  };

  return (
    <div className="flex justify-center items-center">
      <ProjectPortfolioForm
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
        repoLink={repoLink}
        setRepoLink={setRepoLink}
      />
    </div>
  );
};

export default PortfolioFormview;
