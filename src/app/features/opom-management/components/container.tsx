import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOpomRegisteredPeopleList } from '../hook/use-opom-registered-list';
import type { OpomRegisteredListContainePropsType } from '../types/opom-registered-list-type';
import { OpomRegisteredListTable } from './table';

const OpomRegisteredListContainer = ({
  searchQuery,

  page,
  size,
  onPageChange,
  onTotalChange,
  totalUser,
}: OpomRegisteredListContainePropsType) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetOpomRegisteredPeopleList({
    page,
    size,
    keyword: searchQuery,
    sortField: 'devProfile.name',
    sortDirection: 'desc',
  });
  useEffect(() => {
    if (data?.meta?.totalItems && onTotalChange) {
      onTotalChange(data.meta.totalItems);
    }
  }, [data?.meta?.totalItems, onTotalChange]);
  const handleViewDetail = (id: number) => {
    navigate(`${id}`);
  };
  const totalPages = data?.meta ? Math.ceil(data.meta.totalItems / size) : 0;
  const items = data?.data ?? [];
  if (isLoading) return <div className="text-white">Loading...</div>;
  return (
    <>
      <OpomRegisteredListTable
        data={items}
        handleViewDetail={handleViewDetail}
      />
      <div className="flex items-center justify-between mt-14">
        {/* Total Count */}
        <span className={`text-[${COLORS.secondary}] font-semibold`}>
          Total - {totalUser}
        </span>
        {onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
};
export default OpomRegisteredListContainer;
