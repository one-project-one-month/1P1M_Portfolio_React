import { API_ENDPOINTS } from "@/config/apiConfig";
import { fetchApprovedProjects } from "@/services/approvedProjectsService";
import { useQuery } from "@tanstack/react-query";

export const useApprovedProjectsIdeas = () => {
  return useQuery({
    queryKey: ["approvedProjectideas"],
    queryFn: () =>fetchApprovedProjects(),
  });
};
