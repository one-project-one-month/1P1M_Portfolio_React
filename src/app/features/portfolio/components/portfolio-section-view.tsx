import Pagination from '@/components/ui/pagination';
import type { projectSectionViewType } from '@/types/portfolio.type';
import ProjectList from './project-list';

const ProjectSectionView = ({
  isLoading,
  projects,
  currentPage,
  totalPages,
  onPageChange,
}: projectSectionViewType) => {
  return (
    <>
      <ProjectList projects={projects ?? []} isLoading={isLoading} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default ProjectSectionView;
