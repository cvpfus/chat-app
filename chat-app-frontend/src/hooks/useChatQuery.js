import { useQuery } from "@tanstack/react-query";
import chatService from "../services/chatService.js";

export const useChatQuery = () => {
  return useQuery({
    queryKey: ["chat"],
    queryFn: chatService.getHistory,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
