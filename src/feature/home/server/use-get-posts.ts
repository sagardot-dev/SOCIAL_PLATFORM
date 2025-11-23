import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { PostType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPosts = () => {
  const query = useQuery<PostType[]>({
    queryKey: ["getposts"],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<PostType[]>>("/api/posts");
      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
      }
      return res.data.data ?? [];
    },
  });
  return query;
};
