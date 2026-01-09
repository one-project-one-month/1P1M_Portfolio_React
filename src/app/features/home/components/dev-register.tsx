import { useDevProfile } from '@/app/features/developers/hooks/use-dev-profile';
import DevProfile from '@/components/ui/dev-profile';
import SkeletonCard from '@/components/ui/skeleton-card';
import { useAppNavigation } from '@/hooks/use-app-navigate';

const DevRegisterSection = () => {
  const { goTo } = useAppNavigation();

  const { data, isLoading, error } = useDevProfile({
    keyword: '',
    page: 0,
    size: 6,
    sortField: 'id',
    sortDirection: 'desc',
  });

  const profiles = data?.data || [];
  const handleProfileView = (devId: number) => {
    const devData = profiles.find((dev) => dev.dev_id === devId);
    if (!devData) return;

    const username = devData.email.split('@')[0];
    goTo(`/profile/${username}`, { state: { devData } });
  };

  const renderError = () => {
    return (
      <div className="col-span-full text-red-400 py-8 text-center text-lg">
        Failed to load developer profiles.
        <div className="mt-2 text-sm text-gray-400">
          {error?.message || 'Something went wrong.'}
        </div>
      </div>
    );
  };

  const renderDevs = () => {
    if (profiles.length === 0) {
      return (
        <div className="col-span-full text-gray-500">No profiles found.</div>
      );
    }

    return profiles
      .slice(0, 6)
      .map((devProfile) => (
        <DevProfile
          devProfile={devProfile}
          key={devProfile.dev_id}
          viewProfile={() => handleProfileView(devProfile.dev_id)}
        />
      ));
  };

  let content;
  if (error) {
    content = renderError();
  } else if (isLoading) {
    content = <SkeletonCard />;
  } else {
    content = renderDevs();
  }

  return (
    <section className="flex flex-col justify-center text-center text-[#E5E7EB] mb-8">
      <div className="w-full flex justify-between items-center my-8">
        <h1 className="text-5xl">Dev Profile</h1>
        <button
          className="border-b cursor-pointer"
          onClick={() => goTo('/developers')}
        >
          View more
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4">
        {content}
      </div>
    </section>
  );
};

export default DevRegisterSection;
