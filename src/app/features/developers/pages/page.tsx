import Pagination from '@/components/ui/pagination';
import Title from '@/components/ui/title';
import { useDebounce } from '@/hooks/use-debounce';
import type { DevProfile } from '@/types/dev';
import { Users } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ORDER_OPTIONS } from '../../ideas/shared/constants';
import DevCard from '../components/dev-card';
import DevCardSkeleton from '../components/dev-skeleton-card';
import { useDevProfileQuery } from '../hooks/use-dev-profile';

const Developer = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const curPage = Number(searchParams.get('page') ?? 0);
  const searchTerm = searchParams.get('search') ?? '';
  const filter = searchParams.get('order') ?? 'Popular';

  const debounceValue = useDebounce(searchTerm);

  const updateQuery = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  };

  const {
    data,
    isLoading: devsLoading,
    isFetching: devsFetching,
  } = useDevProfileQuery({
    keyword: debounceValue,
    page: curPage,
    size: 6,
    sortField: '',
    sortDirection:
      filter === 'newest' ? 'asc' : filter === 'popular' ? 'desc' : 'desc',
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
        showOrder
        showFilter={false}
        searchPlaceholder="Search by developer name or skill"
        orderOptions={ORDER_OPTIONS}
        selectedOrder={filter}
        onSearchChange={(e) =>
          updateQuery({
            search: e.target.value,
            page: 0, // reset page when searching
          })
        }
        onOrderChange={(value) =>
          updateQuery({
            order: value,
            page: 0, // reset page when sorting
          })
        }
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
          onPageChange={(page) => updateQuery({ page })}
        />
      </div>
    </div>
  );
};

export default Developer;
