import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteCommentData {
  postId?: string;
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId }: DeleteCommentData) => {
      const res = await axios.delete<ApiResponse>("/api/posts", {
        data: { postId },
      });

      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
      }

      return res.data;
    },

    onError: (err) => {
      CustomToast(err.message, "posts_delete_error");
    },

    onSuccess: (data) => {
      CustomToast(data.title, data.code);

      queryClient.invalidateQueries({ queryKey: ["getposts"] });
      queryClient.invalidateQueries({ queryKey: ["getpost"], exact: false });
    },
  });
};
