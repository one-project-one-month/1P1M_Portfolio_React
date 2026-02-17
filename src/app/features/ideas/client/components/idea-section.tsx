import Pagination from '@/components/ui/pagination';
import type { IdeaType } from '../../shared/types/project-idea.types';
import IdeaList from './idea-list';

type Props = {
  isLoading: boolean;
  ideas: (IdeaType & { isAlreadyReacted: boolean })[];
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
}: Props) => {
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
