import { useDebounce } from '@/hooks/use-debounce';
import type {
  PortfolioProjectType,
  PortfolioSectionContainerProps,
} from '@/types/portfolio.type';
import { useEffect, useState } from 'react';
import { useGetProjectPortfolio } from '../hooks/use-get-portfolio';
import ProjectSectionView from './portfolio-section-view';

const SIZE = 2;
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
    size: SIZE,
  });

  const projects = (data?.data ?? []) as PortfolioProjectType[];
  const totalPages = data?.meta?.totalPages ?? 0;

  useEffect(() => {
    setPage(0);
  }, [debounceValue, sortDirection]);

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
