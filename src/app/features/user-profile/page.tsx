import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast-provider';
import { useUserInfoStore } from '@/store/user-info-store';
import { Avatar, Dialog, IconButton, Tooltip } from '@radix-ui/themes';
import { Copy, GithubIcon, Linkedin, Mail, Phone, Send, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { IdeaCard } from '../ideas/shared/components';
import UserEditDialog from './components/user-edit-dialog';
import { useGetUserProfile } from './hooks/useUserProfile';

const UserProfile = () => {
  const userId = useUserInfoStore((state) => state.userInfo?.userId);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isPending, isError } = useGetUserProfile({
    userId,
  });
  const { addToast } = useToast();

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        addToast('Copied to clipboard!', 'success');
      });
    },
    [addToast],
  );

  if (isPending)
    return <div className="text-slate-400">Loading profile...</div>;

  if (isError || !data)
    return <div className="text-rose-400">Failed to load profile</div>;

  const devProfile = data?.data.devProfile;
  const projectIdeas = data?.data.projectIdeas;
  // const projectPortfolios = data?.data.projectPortfolios;

  const truncate = (text: string, max = 45) =>
    text.length > max ? text.slice(0, max) + '...' : text;

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
            <h3 className="text-white font-bold text-2xl">{devProfile.name}</h3>
            {/* <p className="text-muted">{devProfile.role}</p> */}
            <p className="flex items-center gap-3 text-gray-400">
              <Mail size={20} />
              {devProfile.email}
              <IconButton
                variant="ghost"
                className="text-gray-600!"
                onClick={() => copyToClipboard(devProfile.email)}
              >
                <Copy size={18} />
              </IconButton>
            </p>
            {devProfile.phone ? (
              <p className="flex items-center gap-3 text-gray-400">
                <Phone size={20} />
                {devProfile.phone}
                <IconButton
                  variant="ghost"
                  className="text-gray-600!"
                  onClick={() => copyToClipboard(String(devProfile.phone))}
                >
                  <Copy size={18} />
                </IconButton>
              </p>
            ) : (
              <p className="flex items-center gap-3 text-gray-400">
                <Phone size={20} />-
              </p>
            )}
            {devProfile.telegramUsername ? (
              <p className="flex items-center gap-3 text-gray-400">
                <Send size={20} />
                {devProfile.telegramUsername}
                <IconButton
                  variant="ghost"
                  className="text-gray-600!"
                  onClick={() =>
                    copyToClipboard(String(devProfile.telegramUsername))
                  }
                >
                  <Copy size={18} />
                </IconButton>
              </p>
            ) : (
              <p className="flex items-center gap-3 text-gray-400">
                <Send size={20} />-
              </p>
            )}
            <p className="text-muted mt-4">
              {devProfile.aboutDev || 'No bio available'}
            </p>
          </div>
        </div>

        <div className="max-w-3/12 space-x-4 py-4">
          <Dialog.Root
            open={editDialogOpen}
            onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}
          >
            <Dialog.Trigger>
              <Button className="bg-transparent border border-[#9C39FC]">
                Edit profile
              </Button>
            </Dialog.Trigger>
            <UserEditDialog
              data={devProfile}
              setEditDialogOpen={setEditDialogOpen}
            />
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Share profile</Button>
            </Dialog.Trigger>
            <Dialog.Content
              size="2"
              maxWidth="450px"
              className="bg-black! text-white!"
            >
              <div className="flex items-center justify-end">
                <Dialog.Close>
                  <IconButton variant="ghost" className="text-white!">
                    <X />
                  </IconButton>
                </Dialog.Close>
              </div>
              <Dialog.Title align="center">
                Share with your friends
              </Dialog.Title>

              <Dialog.Description
                size="3"
                className="text-gray-400"
                mb="4"
                align="center"
              >
                Share this profile link with others so they can view this user’s
                public information.
              </Dialog.Description>

              <div className="flex items-center justify-between py-2 px-4 bg-slate-900 rounded-md border border-[#364153] truncate">
                <Tooltip content={window.location.href}>
                  <p>{truncate(`${window.location.href}/${userId}`)}</p>
                </Tooltip>
                <IconButton
                  variant="ghost"
                  className="text-gray-600!"
                  onClick={() => copyToClipboard(devProfile.email)}
                >
                  <Copy size={18} />
                </IconButton>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </div>

      {/* Idea */}
      <div className="space-y-6">
        <h2 className="font-extrabold text-4xl text-white">My Project Idea</h2>

        {projectIdeas && projectIdeas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
            {projectIdeas.map((idea) => (
              <IdeaCard
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

        {/* {projectPortfolios && projectPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
            {projectPortfolios.map((project) => (
              <ProjectCard project={project} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No project portfolios</p>
        )} */}
      </div>
    </div>
  );
};

export default UserProfile;
