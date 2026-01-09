import type { GetPortfolioParamsType } from '@/types/portfolio.types';
import { useQuery } from '@tanstack/react-query';
import { getProjectPortfolio } from '../services/portfolio-service';

export const useGetProjectPortfolio = ({
  keyword,
  page,
  sortDirection,
  sortField,
  size,
}: GetPortfolioParamsType) => {
  return useQuery({
    queryKey: [
      'projectPortfolio',
      keyword,
      page,
      sortDirection,
      sortField,
      size,
    ],
    queryFn: () =>
      getProjectPortfolio({ keyword, page, size, sortDirection, sortField }),
  });
};
