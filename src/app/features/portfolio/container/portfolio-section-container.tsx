import { useDebounce } from '@/hooks/use-debounce';
import type {
  PortfolioProjectType,
  PortfolioSectionContainerProps,
} from '@/types/portfolio.type';
import { useState } from 'react';
import ProjectSectionView from '../components/portfolio-section-view';
import { useGetProjectPortfolio } from '../hooks/use-get-portfolio';
const SORT_FIELD = 'name';

const PortfolioSectionContainer = ({
  query,
  sortDirection = 'asc',
}: PortfolioSectionContainerProps) => {
  const debounceValue = useDebounce(query ?? '', 700);
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useGetProjectPortfolio({
    keyword: debounceValue,
    page,
    sortDirection,
    sortField: SORT_FIELD,
    size: 6,
  });

  const totalPages = data?.meta?.totalPages ?? 0;

  const projects: PortfolioProjectType[] = data?.data || [];

  return (
    <ProjectSectionView
      isLoading={isLoading}
      projects={projects}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
};

export default PortfolioSectionContainer;
