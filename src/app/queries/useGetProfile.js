import { useQuery } from "@tanstack/react-query";
import profileService from "@/services/profileService";

export const useUserProfile = (userId) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => profileService.getProfileData(userId),
    enabled: !!userId, 
  });
};
