import { useAppNavigation } from '@/hooks/use-app-navigate';
import type { DevProfile, FeaturedDevProps } from '@/types/dev';
import { Users } from 'lucide-react';
import DevCard from '../../developers/components/dev-card';
import DevCardSkeleton from '../../developers/components/dev-skeleton-card';

const FeaturedDevelopersSection = ({
  profiles,
  error,
  loading,
}: FeaturedDevProps) => {
  const { goTo } = useAppNavigation();

  const devProfiles = profiles ?? [];

  const handleProfileView = (devData: DevProfile) => {
    goTo(`/profile/${devData.user_id}`);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => {
      return <DevCardSkeleton key={i} />;
    });
  };

  const renderError = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-white/5 mb-6">
        <Users size={42} className="text-gray-500" />
      </div>

      <h3 className="text-xl font-semibold text-gray-300">
        No Developers Found
      </h3>

      <p className="mt-3 text-sm text-gray-500 max-w-md">
        Try adjusting your search or filter to find more developers.
      </p>
    </div>
  );

  const renderDevs = () => {
    if (devProfiles.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
          <div className="p-4 rounded-full bg-white/5 mb-4">
            <Users size={36} className="text-gray-500" />
          </div>

          <p className="text-lg font-medium text-gray-300">
            No developer profiles yet
          </p>

          <p className="mt-2 text-sm text-gray-500 max-w-md">
            We're still building our network. Check back later for featured
            developers.
          </p>
        </div>
      );
    }

    return devProfiles
      .slice(0, 6)
      .map((devProfile) => (
        <DevCard
          devProfile={devProfile}
          key={devProfile.user_id}
          viewProfile={() => handleProfileView(devProfile)}
        />
      ));
  };

  return (
    <section className="flex flex-col justify-center text-center text-gray-200 mb-12">
      <div className="w-full flex justify-between items-center my-8 px-2">
        <div>
          <h2 className="text-3xl md:text-5xl mb-2 font-bold">Profiles</h2>
          <div className="w-1/2 h-2 rounded-full bg-primary-custom"></div>
        </div>

        <a
          href="/developers"
          className="border-b border-transparent hover:border-gray-200 transition-colors cursor-pointer text-sm md:text-base pb-1"
        >
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {error ? renderError() : loading ? renderSkeletons() : renderDevs()}
      </div>
    </section>
  );
};

export default FeaturedDevelopersSection;
