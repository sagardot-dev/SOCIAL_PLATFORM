import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { CommentType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetComments = (postId: string | undefined) => {
  return useQuery({
    queryKey: ["comments", postId],
    enabled: !!postId,

    queryFn: async () => {
      const res = await axios.get<ApiResponse<CommentType[]>>(
        `/api/comments?postId=${postId}`
      );

      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
        return [];
      }

      return res.data.data ?? [];
    },
  });
};
