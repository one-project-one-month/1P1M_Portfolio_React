import Pagination from '@/components/ui/pagination';
import SkeletonCard from '@/components/ui/skeleton-card';
import Title from '@/components/ui/title';
import { useDebounce } from '@/hooks/use-debounce';
import type { DevProfile } from '@/types/dev';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DevCard from './components/dev-card';
import { useDevProfileQuery } from './hooks/use-dev-profile';

const Developer = () => {
  const [curPage, setCurPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Popular');
  const navigate = useNavigate();

  const debounceValue = useDebounce(searchTerm);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurPage(0);
  }, [debounceValue, filter]);

  // Determine sorting field and direction
  const { sortField, direction } = useMemo((): {
    sortField: string;
    direction: 'asc' | 'desc';
  } => {
    if (filter === 'Popular') return { sortField: '', direction: 'desc' };
    if (filter === 'Newest') return { sortField: '', direction: 'desc' };
    return { sortField: '', direction: 'asc' };
  }, [filter]);

  // Fetch developer profiles
  const {
    data,
    isLoading: devsLoading,
    isFetching: devsFetching,
  } = useDevProfileQuery({
    keyword: debounceValue,
    page: curPage,
    size: 6,
    sortField,
    sortDirection: direction,
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
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Developer Profiles"
        showSearch
        showFilter
        searchPlaceholder="Search by developer name or skill"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={['Popular', 'Newest', 'Oldest']}
        onFilterChange={setFilter}
      />

      <div className="grow">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {devsLoading || devsFetching ? (
            <SkeletonCard />
          ) : (
            DevProfileDatas.map((devProfile, idx) => (
              <DevCard
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
    </div>
  );
};

export default Developer;
