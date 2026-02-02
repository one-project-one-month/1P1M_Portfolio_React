import SkeletonCard from '@/components/ui/skeleton-card';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import type { DevProfile, FeaturedDevProps } from '@/types/dev';
import DevCard from '../../developers/components/dev-card';

const FeaturedDevelopersSection = ({
  profiles,
  error,
  loading,
}: FeaturedDevProps) => {
  const { goTo } = useAppNavigation();

  const devProfiles = profiles ?? [];

  const handleProfileView = (devData: DevProfile) => {
    const identifier = devData.name || devData.dev_id;

    goTo(`/profile/${identifier}`, { state: { devData } });
  };

  const renderSkeletons = () => {
    return <SkeletonCard />;
  };

  const renderError = () => (
    <div className="col-span-full py-12 text-center" role="alert">
      <p className="text-lg text-red-400">Unable to load developer profiles.</p>
      <p className="mt-2 text-sm text-gray-500">
        {error instanceof Error
          ? error.message
          : 'Please check your connection.'}
      </p>
    </div>
  );

  const renderDevs = () => {
    if (devProfiles.length === 0) {
      return (
        <div className="col-span-full py-12 text-gray-500">
          No profiles found at this time.
        </div>
      );
    }

    return devProfiles
      .slice(0, 6)
      .map((devProfile) => (
        <DevCard
          devProfile={devProfile}
          key={devProfile.dev_id}
          viewProfile={() => handleProfileView(devProfile)}
        />
      ));
  };

  return (
    <section className="flex flex-col justify-center text-center text-gray-200 mb-12">
      <div className="w-full flex justify-between items-end my-8 px-2">
        <h2 className="text-3xl md:text-5xl font-bold">Featured Developers</h2>

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
