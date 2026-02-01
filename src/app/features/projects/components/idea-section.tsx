import Pagination from '@/components/ui/pagination';
import type { ProjectIdeaType } from '../../idea-management/types/project-idea.types';
import IdeaList from './idea-list';

export type IdeaSectionProps = {
  isLoading: boolean;
  ideas: ProjectIdeaType[];
  totalPages: number | 1;
  currentPage: 0 | number;
  onPageChange: (page: number) => void;
};

const IdeaSection = ({
  isLoading,
  ideas,
  currentPage,
  onPageChange,
  totalPages,
}: IdeaSectionProps) => {
  return (
    <>
      <IdeaList data={ideas ?? []} isLoading={isLoading} />

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

export default IdeaSection;
