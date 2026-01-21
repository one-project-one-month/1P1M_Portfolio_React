import Pagination from '@/components/ui/pagination';
import { COLORS } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { useGetProjectIdea } from '../hooks/use-project-ideas';
import type {
  IdeaEditFormValues,
  ProjectIdeaContainerPropsType,
} from '../types/project-idea.types';
import IdeaManagementGrid from './grid-view';
import IdeaManagementTable from './list-view';
import ProjectIdeaEditDialog from './project-idea-edit-dialog/index';

const ProjectIdeaContainer = ({
  view,
  searchQuery,
  selectedFilter,
  page,
  size,
  onPageChange,
  onTotalChange,
  totalIdeas,
  editOpen,
  setEditOpen,
}: ProjectIdeaContainerPropsType) => {
  const { data, isLoading, isError } = useGetProjectIdea({
    page,
    size,
    keyword: searchQuery,
    sortField: selectedFilter,
  });

  const [editInitialValues, setEditInitialValues] =
    useState<IdeaEditFormValues | null>(null);

  useEffect(() => {
    if (data?.meta?.totalItems && onTotalChange) {
      onTotalChange(data.meta.totalItems);
    }
  }, [data?.meta?.totalItems, onTotalChange]);

  const MOCK_EDIT_VALUES: IdeaEditFormValues = {
    projectName: 'Smart Order & Booking Management System',
    description:
      'A web-based system that allows customers to book tables and place food orders online...',
    projectTypes: ['Website'],
    dev_id: 1,
    status: 'APPROVED',
  };

  const handleEdit = (idea: IdeaEditFormValues) => {
    setEditInitialValues({
      projectName: idea.projectName ?? '',
      description: idea.description ?? '',
      projectTypes: idea.projectTypes ?? [],
      dev_id: idea.dev_id ?? null,
      status: idea.status ?? 'PENDING',
    });
    setEditOpen(true);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };
  const handleViewDetail = (id: number) => {
    console.log(id);
  };
  const handleStatusChange = (status: 'PENDING' | 'APPROVED' | 'ARCHIVED') => {
    console.log(status);
  };
  const handleImportPortfolio = (id: number) => {
    console.log(id);
  };

  // if (isLoading) return <div className="text-slate-400">Loading ideas...</div>;

  // if (isError || !data?.success)
  //   return <div className="text-rose-400">Failed to load ideas</div>;

  // Ensure children always receive an array (empty when no data).
  const items = data?.data ?? [];
  const totalPages = data?.meta ? Math.ceil(data.meta.totalItems / size) : 0;

  return (
    <div>
      {view === 'list' ? (
        <IdeaManagementTable
          // data={items}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleViewDetail={handleViewDetail}
          handleStatusChange={handleStatusChange}
          handleImportPortfolio={handleImportPortfolio}
        />
      ) : (
        <IdeaManagementGrid
          // data={items}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleViewDetail={handleViewDetail}
          handleStatusChange={handleStatusChange}
        />
      )}

      <div className="flex items-center justify-between mt-14">
        {/* Total Count */}
        <span className={`text-[${COLORS.secondary}] font-semibold`}>
          Total - {totalIdeas}
        </span>
        {onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>

      <ProjectIdeaEditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initialValues={editInitialValues ?? MOCK_EDIT_VALUES}
        onSubmit={(values) => {
          // call update API
          setEditOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectIdeaContainer;
