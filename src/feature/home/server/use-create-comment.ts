import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CommentData {
  postId: string;
  content: string;
  image?: string;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CommentData) => {
      const res = await axios.post<ApiResponse>("/api/comments", data);

      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
      }

      return res.data;
    },

    onError: (err) => {
      CustomToast(err.message, "comment_error");
    },

    onSuccess: (data) => {
      CustomToast(data.title, data.code);
      queryClient.invalidateQueries({ queryKey: ["getposts"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["getpost"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};
