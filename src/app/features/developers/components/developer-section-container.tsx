import DevProfileCard from '@/components/ui/dev-profile-card';
import Pagination from '@/components/ui/pagination';
import { useDebounce } from '@/hooks/use-debounce';
import type { DevProfile } from '@/types/dev';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevProfileQuery } from '../hooks/use-dev-profile';
import DevCardSkeleton from './dev-skeleton-card';

const DeveloperSectionContainer = ({
  searchTerm,
  sortDirection,
}: {
  searchTerm: string;
  sortDirection: 'asc' | 'desc' | null;
}) => {
  const [curPage, setCurPage] = useState(0);
  const navigate = useNavigate();

  const debounceValue = useDebounce(searchTerm);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurPage(0);
  }, [debounceValue, sortDirection]);

  // Fetch developer profiles
  const {
    data,
    isLoading: devsLoading,
    isFetching: devsFetching,
  } = useDevProfileQuery({
    keyword: debounceValue,
    page: curPage,
    size: 6,
    sortField: '',
    sortDirection: sortDirection as 'asc' | 'desc',
  });

  const DevProfileDatas = (data?.data ?? []) as DevProfile[];

  const totalPages = data?.meta?.totalPages ?? 1;

  const handleProfileView = (devId: number) => {
    const devData = DevProfileDatas.find((dev) => dev.dev_id === devId);

    if (!devData) return;
    const username = devData.email.split('@')[0];
    navigate(`/profile/${username}`, { state: { devData } });
  };

  return (
    <>
      <div className="grow">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {devsLoading || devsFetching ? (
            <DevCardSkeleton />
          ) : (
            DevProfileDatas.map((devProfile, idx) => (
              <DevProfileCard
                key={idx}
                devProfile={devProfile}
                viewProfile={() => handleProfileView(devProfile.dev_id)}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          currentPage={curPage}
          totalPages={totalPages}
          onPageChange={setCurPage}
        />
      </div>
    </>
  );
};

export default DeveloperSectionContainer;
