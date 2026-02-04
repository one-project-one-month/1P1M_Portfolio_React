import { useQuery } from '@tanstack/react-query';
import { getProjectPortfolioDetails } from '../services/portfolio-service';

const useGetPortfolioDetail = (projectId: number) => {
  return useQuery({
    queryKey: ['projectPortfolio', projectId],
    queryFn: () => getProjectPortfolioDetails(projectId),
  });
};

export default useGetPortfolioDetail;
