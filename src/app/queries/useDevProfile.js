import { newGetDevProfiles } from "@/services/devProfileService";
import { useQuery } from "@tanstack/react-query";

export const useDevProfile = ({
  keyword,
  page,
  sortDirection,
  sortField,
  size,
}) => {
  return useQuery({
    queryKey: ["devProfiles", keyword, page, sortDirection, sortField, size],
    queryFn: () =>
      newGetDevProfiles({keyword,page,size,sortDirection,sortField}),
  });
};
