import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteCommentData {
  commentId: string;
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId }: DeleteCommentData) => {
      const res = await axios.delete<ApiResponse>("/api/comments", {
        data: { commentId },
      });

      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
      }

      return res.data;
    },

    onError: (err) => {
      CustomToast(err.message, "comment_delete_error");
    },

    onSuccess: (data) => {
      CustomToast(data.title, data.code);

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      queryClient.invalidateQueries({ queryKey: ["getposts"] });
      queryClient.invalidateQueries({ queryKey: ["getpost"] });
    },
  });
};
