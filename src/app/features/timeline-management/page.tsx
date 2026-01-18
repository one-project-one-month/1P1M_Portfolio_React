import Pagination from '@/components/ui/pagination';
import Title from '@/components/ui/title';
import { useState } from 'react';

const TimelineManagement = () => {
  const [curPage, setCurPage] = useState(0);

  const totalPages = 99;

  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title showSearch={false} showFilter={false} title="Timeline List" />

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

export default TimelineManagement;
