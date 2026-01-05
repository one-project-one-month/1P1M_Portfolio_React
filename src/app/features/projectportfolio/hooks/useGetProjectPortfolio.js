import { useQuery } from "@tanstack/react-query";
import { getProjectPortfolio } from "../service/projectPortfolioService";

export const useGetProjectPortfolio = ({
  keyword,
  page,
  sortDirection,
  sortField,
  size,
}) => {
  return useQuery({
    queryKey: [
      "projectPortfolio",
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
