import type { GetPortfolioParamsType } from '@/types/portfolio.type';
import { useQuery } from '@tanstack/react-query';
import { getProjectPortfolio } from '../services/portfolio-service';

export const useGetProjectPortfolio = ({
  keyword,
  page,
  sortDirection,
  sortField,
  size,
  projectPortfolioStatus,
}: GetPortfolioParamsType) => {
  return useQuery({
    queryKey: [
      'projectPortfolio',
      keyword,
      page,
      sortDirection,
      sortField,
      size,
      projectPortfolioStatus,
    ],
    queryFn: () =>
      getProjectPortfolio({
        keyword,
        page,
        size,
        sortDirection,
        sortField,
        projectPortfolioStatus,
      }),
  });
};
