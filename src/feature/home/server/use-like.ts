import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { LikeResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useToggleReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await axios.post<ApiResponse<LikeResponse>>(
        "/api/reaction/posts",
        { postId }
      );
      return res.data;
    },

    onError: (error) => {
      CustomToast(error.message, "error");
      queryClient.invalidateQueries({ queryKey: ["getposts"] });
    },

    onSuccess: (data) => {
      CustomToast(data.title, data.code);
    },
    
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["getposts"] });
      }, 3000);
    },
  });
};
