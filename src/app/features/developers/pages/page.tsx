import Pagination from '@/components/ui/pagination';
import Title from '@/components/ui/title';
import { useDebounce } from '@/hooks/use-debounce';
import type { DevProfile } from '@/types/dev';
import { Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FILTER_OPTIONS } from '../../ideas/shared/constants';
import DevCard from '../components/dev-card';
import DevCardSkeleton from '../components/dev-skeleton-card';
import { useDevProfileQuery } from '../hooks/use-dev-profile';

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

  const handleProfileView = (user_id: number) => {
    navigate(`/profile/${user_id}`);
  };

  return (
    <div className="flex flex-col">
      <Title
        title="Developer Profiles"
        showSearch
        showFilter
        searchPlaceholder="Search by developer name or skill"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={FILTER_OPTIONS}
        onFilterChange={setFilter}
      />

      <div className="grow">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {devsLoading || devsFetching ? (
            Array.from({ length: 6 }).map((_, i) => <DevCardSkeleton key={i} />)
          ) : DevProfileDatas.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="p-5 rounded-full bg-white/5 mb-6">
                <Users size={42} className="text-gray-500" />
              </div>

              <h3 className="text-xl font-semibold text-gray-300">
                No Developers Found
              </h3>

              <p className="mt-3 text-sm text-gray-500 max-w-md">
                Try adjusting your search or filter to find more developers.
              </p>
            </div>
          ) : (
            DevProfileDatas.map((devProfile) => (
              <DevCard
                key={devProfile.dev_id}
                devProfile={devProfile}
                viewProfile={() => handleProfileView(devProfile.user_id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="w-full mt-4 flex justify-center">
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
