import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { ProjectData } from '../../portfolio-management/constants/data';
import useGetPortfolioDetail from '../hooks/use-get-portfolio-detail';
import ProjectPortfolioForm from './project-portfolio-form';

const PortfolioEditview = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { projectDetailData } = location.state || {};
  const [repoLink, setRepoLink] = useState(projectDetailData?.repoLink || '');

  const { data: projectData } = useGetPortfolioDetail(Number(projectId));

  const handleSave = (data: Partial<ProjectData>) => {
    console.log('Saving project:', data);
    navigate('/portfolio');
  };

  const handleCancel = () => {
    navigate('/portfolio');
  };

  const formattedData = (data: any) => {
    return {
      projectName: data.name,
      image: data.projectPicUrl,
      technologies: data.languageAndTools.map((tech: any) => ({
        projectType: { id: tech.id, name: tech.type },
        languages: tech.name,
      })),
      teams: data.teams.map((team) => ({
        id: team.id,
        name: team.teamName,
        count: Number(team.members.length),
        members: team.members.map((member) => ({
          id: member.id,
          name: member.name,
          // email: 'kozaw2@gmail.com',
          profilePictureUrl: member.profilePictureUrl || sampleUserImgUrl,
          role: 'Team Leader',
        })),
      })),
      // ...data,
    };
  };

  return (
    <div className="flex justify-center items-center">
      <ProjectPortfolioForm
        mode="edit"
        initialData={
          (projectDetailData && formattedData(projectDetailData)) ??
          formattedData(projectData)
        }
        onSave={handleSave}
        onCancel={handleCancel}
        onClose={handleCancel}
        repoLink={repoLink}
        setRepoLink={setRepoLink}
      />
    </div>
  );
};

export default PortfolioEditview;
