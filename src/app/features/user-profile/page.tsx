import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { useUserInfoStore } from '@/store/user-info-store';
import { Avatar, IconButton } from '@radix-ui/themes';
import { Copy, GithubIcon, Linkedin, Mail } from 'lucide-react';
import ProjectIdeaCard from '../idea-management/components/project-idea-card';
import { useGetUserProfile } from './hooks/useUserProfile';

const UserProfile = () => {
  const { userId } = useUserInfoStore((state) => state.userInfo) || {};
  const { data, isLoading, isError } = useGetUserProfile({
    userId,
  });

  if (isLoading)
    return <div className="text-slate-400">Loading profile...</div>;

  if (isError || !data)
    return <div className="text-rose-400">Failed to load profile</div>;

  const devProfile = data?.data.devProfile;
  const projectIdeas = data?.data?.projectIdeas;
  const projectPortfolios = data?.data?.projectPortfolios;

  return (
    <div className="space-y-14 py-10">
      {/* Hero */}
      <div className="py-6 px-12 flex items-start justify-between bg-[#FFFFFF1A] rounded-lg backdrop-blur-sm">
        <div className="max-w-9/12 flex items-start gap-6 py-4">
          <div className="flex flex-col space-y-3 items-center">
            <Avatar
              size="9"
              src={devProfile.profilePictureUrl || sampleUserImgUrl}
              fallback={devProfile.name.charAt(0)}
            />
            <div className="flex items-center justify-center gap-2">
              {devProfile.github && (
                <IconButton
                  radius="full"
                  variant="outline"
                  className="text-white! border! border-white!"
                  onClick={() => window.open(devProfile.github, '_blank')}
                >
                  <GithubIcon width="18" height="18" />
                </IconButton>
              )}
              {devProfile.linkedIn && (
                <IconButton
                  radius="full"
                  variant="outline"
                  className="text-white! border! border-white!"
                  onClick={() => window.open(devProfile.linkedIn, '_blank')}
                >
                  <Linkedin width="18" height="18" />
                </IconButton>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-bold text-2xl capitalize">
              {devProfile.name}
            </h3>
            <p className="text-muted">{devProfile.role}</p>
            <p className="flex items-center gap-3 text-muted">
              <Mail size={20} />
              {devProfile.email}
              <IconButton variant="ghost" className="text-gray-600!">
                <Copy size={18} />
              </IconButton>
            </p>
            {devProfile.github && (
              <p className="flex items-center gap-3 text-muted">
                <GithubIcon size={20} />
                {devProfile.github}
                <IconButton variant="ghost" className="text-gray-600!">
                  <Copy size={18} />
                </IconButton>
              </p>
            )}
            {devProfile.linkedIn && (
              <p className="flex items-center gap-3 text-muted">
                <Linkedin size={20} />
                {devProfile.linkedIn}
                <IconButton variant="ghost" className="text-gray-600!">
                  <Copy size={18} />
                </IconButton>
              </p>
            )}
            <p className="text-muted">
              {devProfile.aboutDev || 'No bio available'}
            </p>
          </div>
        </div>

        <div className="max-w-3/12 space-x-4 py-4">
          <Button className="bg-transparent border border-[#9C39FC]">
            Edit profile
          </Button>
          <Button>Share profile</Button>
        </div>
      </div>

      {/* Idea */}
      <div className="space-y-6">
        <h2 className="font-extrabold text-4xl text-white">My Project Idea</h2>

        {projectIdeas && projectIdeas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
            {projectIdeas.map((idea) => (
              <ProjectIdeaCard
                idea={{
                  id: idea.projectIdeaId,
                  projectIdeaName: idea.projectIdeaName,
                  status: idea.status as 'PENDING' | 'APPROVED' | 'ARCHIVED',
                  description: idea.description,
                  reactionCount: idea.reactionCount,
                  viewCount: idea.viewCount,
                  dev_id: idea.dev_id,
                  leader_id: idea.leader_id,
                  projectTypes: idea.projectTypes,
                  devName: '',
                  ownerProfilePicUrl: idea.ownerProfilePicUrl || '',
                  leaderProfilePicUrl: idea.leaderProfilePicUrl || '',
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No project ideas</p>
        )}
      </div>

      {/* Portfolio */}
      <div className="space-y-6">
        <h2 className="font-extrabold text-4xl text-white">
          My Project Portfolios
        </h2>

        {projectPortfolios && projectPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
            {/* {projectPortfolios.map((project) => (
              <ProjectCard project={project} />
            ))} */}
          </div>
        ) : (
          <p className="text-slate-400">No project ideas</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
