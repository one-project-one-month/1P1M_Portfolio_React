import { getOpomRegsiter } from "@/services/opomService";
import { useQuery } from "@tanstack/react-query";

export const useOpomRegister = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}) => {
  return useQuery({
    queryKey: ["opomRegister", keyword, page, size, sortField, sortDirection],
    queryFn: () =>
      getOpomRegsiter({ keyword, page, size, sortField, sortDirection }),
  });
};
