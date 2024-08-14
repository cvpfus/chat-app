import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService.js";

export const useUserQuery = (isEnabled) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: userService.getUser,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};
