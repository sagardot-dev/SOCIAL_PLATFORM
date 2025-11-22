import { CustomToast } from "@/components/global/custom-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetSignUrlMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: {
      fileName: string;
      ext: string;
      type: string;
    }) => {
      const res = await axios.post("/api/get-sign-url", data, {
        headers: { "Content-Type": data?.type },
      });
      if (!res.data.success) {
        throw new Error("Failed to get the sign url");
      }
      return res.data;
    },
    onSuccess: (data) => {
      CustomToast(
        data.message || "success creating signUrl",
        "signurl create successfully"
      );
    },
    onError: (error) => {
      CustomToast(
        error.message || "Something went wrong",
        "error while getting signUrl"
      );
    },
  });
  return mutation;
};
