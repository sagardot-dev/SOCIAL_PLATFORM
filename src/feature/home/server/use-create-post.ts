import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  content: string;
  image?: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: Data) => {
      const res = await axios.post<ApiResponse>("/api/posts", data);
      if (res.data.type === "error") {
        CustomToast(res.data.title, res.data.code);
      }
      return res.data;
    },
    onError: (error) => {
      CustomToast(error.message, "error occur");
    },
    onSuccess: (data) => {
      CustomToast(data.title, data.code);
      queryClient.invalidateQueries({ queryKey: ["getposts"] });
    },
  });

  return mutation;
};
