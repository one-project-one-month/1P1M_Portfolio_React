import PjImage from '@/assets/project-image.png';
import { useUserInfoStore } from '@/store/user-info-store';
import { IdeaCard } from '../ideas/shared/components';
import type { IdeaType } from '../ideas/shared/types/project-idea.types';
import ProjectCard from '../portfolio/components/project-card';
import { ProfileActions } from './components/profile-actions';
import { ProfileHeader } from './components/profile-header';
import { ProfileInfo } from './components/profile-info';
import { ProjectSection } from './components/project-section';
import { useClipboard } from './hooks/use-clipboard';
import { useGetUserProfile } from './hooks/use-user-profile';
import { truncate } from './utils/string.utils';

const UserProfile = () => {
  const { copyToClipboard } = useClipboard();
  const userId = useUserInfoStore((state) => state.userInfo?.userId);

  const { data, isPending, isError } = useGetUserProfile(userId);
  const devProfile = data?.data.devProfile;
  const projectIdeas = data?.data.projectIdeas as (IdeaType & {
    isAlreadyReacted: boolean;
  })[];
  const projectPortfolios = data?.data.projectPortfolios;

  if (isPending) {
    return <div className="text-slate-400">Loading profile...</div>;
  }

  if (isError || !data || !devProfile) {
    return <div className="text-rose-400">Failed to load profile</div>;
  }

  return (
    <div className="space-y-14 py-10">
      {/* Profile Section */}
      <div className="py-6 px-4 md:px-12 flex flex-col md:flex-row items-start md:items-start justify-between gap-6 md:gap-0 bg-[#FFFFFF1A] rounded-lg backdrop-blur-md">
        <div className="w-full md:max-w-9/12 flex flex-col sm:flex-row items-start gap-6 py-2 md:py-4">
          <ProfileHeader devProfile={devProfile} />
          <ProfileInfo devProfile={devProfile} onCopy={copyToClipboard} />
        </div>
        <ProfileActions
          devProfile={devProfile}
          userId={userId}
          onCopy={copyToClipboard}
          truncate={truncate}
        />
      </div>

      {/* Project Ideas Section */}
      <ProjectSection
        title="Project Ideas"
        isEmpty={!projectIdeas || projectIdeas.length === 0}
        emptyMessage="No project ideas"
      >
        {projectIdeas?.map((idea) => (
          <IdeaCard
            key={idea.projectIdeaId}
            idea={{
              projectIdeaId: idea.projectIdeaId,
              projectIdeaName: idea.projectIdeaName,
              status: idea.status as
                | 'REJECTED'
                | 'APPROVED'
                | 'IN_PROGRESS'
                | 'COMPLETED'
                | 'PENDING'
                | 'DELETED',
              description: idea.description,
              reactionCount: idea.reactionCount,
              viewCount: idea.viewCount,
              dev_id: idea.dev_id,
              dev_Email: idea.dev_Email,
              leader_id: idea.leader_id,
              projectTypes: idea.projectTypes,
              devUsername: idea.devUsername,
              ownerProfilePicUrl: idea.ownerProfilePicUrl || '',
              leaderProfilePicUrl: idea.leaderProfilePicUrl || '',
              isAlreadyReacted: idea.isAlreadyReacted,
            }}
          />
        ))}
      </ProjectSection>

      {/* Project Portfolios Section */}
      <ProjectSection
        title="Project Portfolios"
        isEmpty={!projectPortfolios || projectPortfolios.length === 0}
        emptyMessage="No project portfolios"
      >
        {projectPortfolios?.map((project) => (
          <ProjectCard
            key={project.id}
            image={project.projectPicUrl || PjImage}
            title={project.name}
            description={project.description || ''}
            initialLikes={project.reactedCount || 0}
            initialViews={project.viewCount || 0}
            onClickReact={() => {}}
            project={{
              ...project,
              description: project.description || '',
              projectLink: project.projectLink || '',
              repoLink: project.repoLink || '',
              projectPortfolioStatus: 'ACTIVE',
              reactedProjectPortfolios: [],
              languageAndTools: project.projectTypes || [],
              teams: project.teams.map((team) => ({
                members: team.members.map((member) => ({
                  id:
                    typeof member.id === 'number'
                      ? member.id
                      : parseInt(member.id as string),
                  name: member.name,
                  profilePictureUrl: member.profilePictureUrl,
                  github: member.github,
                  linkedIn: member.linkedIn,
                  aboutDev: member.aboutDev,
                })),
              })),
            }}
          />
        ))}
      </ProjectSection>
    </div>
  );
};

export default UserProfile;
