import { fetchAllRes } from "@/api/api";
import { useMutation } from "@tanstack/react-query";

export function useFetchAll() {
  return useMutation({
    mutationFn: fetchAllRes,
    onSuccess: (data) => {
      console.log("fetched successful:");
    },
    onError: (error) => {
      console.error("fetch error:", error.message);
    },
  });
}
