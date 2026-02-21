import BackButton from '@/components/common/back-button';
import type { UserProfile } from '@/types/dev';
import type { ProjectPortfolio } from '@/types/portfolio.type';
import { LightbulbOff, List } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IdeaListCardSkeleton from '../../home/components/idea-list/idea-list-card-skeleton';
import { IdeaCard } from '../../ideas/shared/components';
import {
  useReactProjectIdea,
  useUnReactProjectIdea,
} from '../../ideas/shared/hooks/project-idea.query';
import type { IdeaType } from '../../ideas/shared/types/project-idea.types';
import PortfolioCardSkeleton from '../../portfolio/components/portfolio-card-skeleton';
import { useGetUserProfile } from '../../user-profile/hooks/use-user-profile';
import DeveloperProfileCard from '../components/developer-profile-card';
import DeveloperProfileCardSkeleton from '../components/developer-profile-skeleton-card';
import ProjectCard from '../components/project-card';

function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  if (!userId) navigate('/not-found');

  const { data, isLoading, isError } = useGetUserProfile(Number(userId));

  const { mutate: react } = useReactProjectIdea();
  const { mutate: unreact } = useUnReactProjectIdea();

  const handleReactIdea = useCallback(
    (id: number, isReacted: boolean) => {
      if (isReacted) {
        unreact(id);
      } else react(id);
    },
    [react, unreact],
  );

  const user = (data?.data.devProfile ?? null) as UserProfile | null;
  const ideaLists = (data?.data.projectIdeas ?? []) as (IdeaType & {
    isAlreadyReacted: boolean;
  })[];
  const projectLists = (data?.data.projectPortfolios ?? []) as
    | ProjectPortfolio[]
    | [];

  if (isError) navigate('/not-found');

  return (
    <div className="w-full">
      <BackButton onClick={() => navigate(-1)} />
      <div className="my-3">
        {isLoading ? (
          <div className="flex flex-col gap-6">
            <DeveloperProfileCardSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <IdeaListCardSkeleton key={i} />
              ))}
            </div>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map(() => {
                return <PortfolioCardSkeleton />;
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <DeveloperProfileCard user={user} />
            <div>
              <h1 className="text-white text-xl mb-6 font-semibold">
                Project Ideas
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideaLists.length > 0 ? (
                  ideaLists.map((idea) => (
                    <IdeaCard
                      key={idea.projectIdeaId}
                      idea={idea}
                      onReact={handleReactIdea}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-white/40">
                    <LightbulbOff size={48} className="mb-4 opacity-60" />
                    <p className="text-lg font-medium">No ideas yet</p>
                    <p className="text-sm mt-2 text-white/30">
                      Submit a project idea.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl mb-6 font-semibold">
                Project Portfolios
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectLists.length > 0 ? (
                  projectLists.map((pro) => (
                    <ProjectCard
                      views={0}
                      react={pro.reaction_count}
                      title={pro.name}
                      developers={pro.assignedDevs.developers}
                      id={pro.id}
                      status={pro.status}
                      image={pro.projectPicUrl}
                      isReacted={pro.alreadyReacted}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-white/40">
                    <List size={48} className="mb-4 opacity-60" />
                    <p className="text-lg font-medium">No Portfolios yet</p>
                    <p className="text-sm mt-2 text-white/30">
                      Create a project portfolio.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
