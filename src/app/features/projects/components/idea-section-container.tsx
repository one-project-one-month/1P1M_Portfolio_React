import { useDebounce } from '@/hooks/use-debounce';
import { useState } from 'react';
import { useGetProjectIdea } from '../../idea-management/hooks/use-project-ideas';
import type { ProjectIdeaType } from '../../idea-management/types/project-idea.types';
import IdeaSection from './idea-section';

interface IdeaSectionProps {
  query: string;
  direction: undefined | 'desc' | 'asc';
}

const IdeaSectionContainer = ({ query, direction }: IdeaSectionProps) => {
  const debounceValue = useDebounce(query ?? '', 700);
  const [page, setPage] = useState<number>(0);
  const { data, isLoading } = useGetProjectIdea({
    keyword: debounceValue,
    page: page,
    size: 6,
    sortDirection: direction,
    sortField: 'devProfile.name',
  });

  const totalPages = data?.meta?.totalPages;
  const ideas: ProjectIdeaType[] = data?.data || [];

  return (
    <IdeaSection
      isLoading={isLoading}
      totalPages={totalPages ?? 1}
      ideas={ideas}
      currentPage={page}
      onPageChange={setPage}
    />
  );
};

export default IdeaSectionContainer;
