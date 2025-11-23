import { CustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/lib/api-type/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/types";

export const useToggleReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await axios.post<ApiResponse>("/api/reaction/posts", { postId });
      return res.data;
    },

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["getposts"] });

      const previous = queryClient.getQueryData<PostType[]>(["getposts"]);

      queryClient.setQueryData(["getposts"], (old: PostType[] | undefined) => {
        if (!old) return old;

        return old.map((p) =>
          p.id === postId
            ? {
                ...p,
                isLiked: !p.isLiked,
                reactions: p.isLiked
                  ? p.reactions.slice(0, -1)
                  : [...p.reactions, {}],
              }
            : p
        );
      });

      return { previous };
    },

    onError: (error, _postId, ctx) => {
      CustomToast(error.message, "error");
      if (ctx?.previous) {
        queryClient.setQueryData(["getposts"], ctx.previous);
      }
    },

    onSuccess: (data) => {
      CustomToast(data.title, data.code);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getposts"] });
      queryClient.invalidateQueries({ queryKey: ["getpost"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
