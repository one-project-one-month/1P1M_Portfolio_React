import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { memo } from 'react';
import { useGetProjectIdea } from '../hooks/use-project-ideas';
import type { ProjectIdeaContainerPropsType } from '../types/project-idea.types';
import IdeaManagementGrid from './grid-view';
import IdeaManagementTable from './list-view';

// const MOCK_DATA: {
//   success: number;
//   code: number;
//   message: string;
//   meta: {
//     totalItems: number;
//     totalPages: number;
//     currentPage: number;
//     method: string;
//     endpoint: string;
//   };
//   data: ProjectIdeaType[];
// } = {
//   success: 1,
//   code: 200,
//   message: 'success',
//   meta: {
//     totalItems: 2,
//     totalPages: 1,
//     currentPage: 1,
//     method: 'get',
//     endpoint: '/portfolio/api/v1/project-idea/getAllProjects',
//   },
//   data: [
//     {
//       id: 1,
//       dev_id: 1,
//       projectName: 'Smart Order & Booking Management System',
//       description:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
//       profilePictureUrl: '',
//       devName: 'john doe',
//       reaction_count: 5,
//       projectTypes: ['website', 'mobile'],
//       reactedProjects: [1, 2],
//       status: 'APPROVED' as const,
//     },
//     {
//       id: 2,
//       dev_id: 1,
//       projectName:
//         'Smart Order & Booking Management System Smart Order & Booking Management System',
//       description:
//         'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
//       profilePictureUrl: '',
//       devName: 'alice',
//       reaction_count: 3,
//       projectTypes: ['frontend', 'backend'],
//       reactedProjects: [1, 2],
//       status: 'PENDING' as const,
//     },
//   ],
// };

const ProjectIdeaContainer = ({
  view,
  filter,
  currentPage,
  pageSize,
  onPageChange,
}: ProjectIdeaContainerPropsType) => {
  const { data, isLoading, isError } = useGetProjectIdea({
    page: currentPage,
    size: pageSize,
    keyword: filter?.search,
    sortField: filter?.status,
  });

  if (isLoading) return <div className="text-slate-400">Loading ideas...</div>;

  if (isError || !data?.success)
    return <div className="text-rose-400">Failed to load ideas</div>;

  // Ensure children always receive an array (empty when no data).
  const items = data?.data ?? [];
  const totalItems = data?.meta?.totalItems;
  const totalPages = data?.meta
    ? Math.ceil(data.meta.totalItems / pageSize)
    : 0;

  return (
    <div>
      {view === 'list' ? (
        <IdeaManagementTable data={items} />
      ) : (
        <IdeaManagementGrid data={items} />
      )}

      <div className="flex items-center justify-between mt-14">
        <span className={`text-[${COLORS.secondary}] font-semibold`}>
          Total - {totalItems}
        </span>
        {onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ProjectIdeaContainer);
