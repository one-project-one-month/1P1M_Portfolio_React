import { useGetRandomProfiles } from '../hooks/developer.query';
import FeaturedDevelopersSection from './dev-register';

const FeaturedDevelopersSectionContainer = () => {
  const { data, isLoading, error } = useGetRandomProfiles();

  return (
    <FeaturedDevelopersSection
      profiles={data?.data}
      error={error}
      loading={isLoading}
    />
  );
};

export default FeaturedDevelopersSectionContainer;
