import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { UserWithPosts } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserPosts = (page: number = 1) => {
  const query = useQuery({
    queryKey: ["userPosts", page],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<UserWithPosts>>(
        `/api/users?page=${page}`
      );

      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
        return null;
      }
      return res.data;
    },
  });

  return query;
};
