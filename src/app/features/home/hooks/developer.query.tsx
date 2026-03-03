import { useQuery } from '@tanstack/react-query';
import { getRandomProfile } from '../services/developer.service';

export const useGetRandomProfiles = () => {
  return useQuery({
    queryKey: ['random-profiles'],
    queryFn: getRandomProfile,
  });
};
