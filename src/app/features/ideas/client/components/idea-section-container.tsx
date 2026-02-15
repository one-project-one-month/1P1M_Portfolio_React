import { useDebounce } from '@/hooks/use-debounce';
import { useState } from 'react';
import { useGetProjectIdea } from '../../shared/hooks/use-get-project-idea';
import type { IdeaType } from '../../shared/types/project-idea.types';
import IdeaSection from './idea-section';

type Props = {
  query?: string;
  status?:
    | ''
    | 'REJECTED'
    | 'APPROVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED'
    | 'PENDING';
  order?: 'popular' | 'newest' | 'oldest';
};

const IdeaSectionContainer = ({ query, status, order }: Props) => {
  const debounceValue = useDebounce(query ?? '', 700);
  const [page, setPage] = useState<number>(0);
  const { data, isPending } = useGetProjectIdea({
    keyword: debounceValue,
    page: page,
    size: 6,
    status,
    sortOrder: order,
  });

  const totalPages = data?.meta.totalPages;
  const ideas: IdeaType[] = data?.data || [];

  return (
    <IdeaSection
      isLoading={isPending}
      totalPages={totalPages ?? 1}
      ideas={ideas}
      currentPage={page}
      onPageChange={setPage}
    />
  );
};

export default IdeaSectionContainer;
