import { useDebounce } from '@/hooks/use-debounce';
import type { PortfolioSectionContainerProps } from '@/types/portfolio.type';
import { useState } from 'react';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { mapApiToProjectData } from '../../portfolio-management/utils/helpers';
import ProjectSectionView from '../components/portfolio-section-view';
import { useGetProjectPortfolio } from '../hooks/use-get-portfolio';
const SORT_FIELD = 'name';

const PortfolioSectionContainer = ({
  query,
  sortDirection = 'asc',
  status = 'all',
}: PortfolioSectionContainerProps) => {
  const debounceValue = useDebounce(query ?? '', 700);
  const [page, setPage] = useState<number>(0);

  const { data: response, isLoading } = useGetProjectPortfolio({
    keyword: debounceValue,
    page,
    sortDirection,
    sortField: SORT_FIELD,
    projectPortfolioStatus: status,
    size: 6,
  });

  const totalPages = response?.meta?.totalPages ?? 0;

  const mappedData = response?.data.map((item: any) =>
    mapApiToProjectData(item),
  );
  const projects: ProjectData[] = mappedData || [];

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
