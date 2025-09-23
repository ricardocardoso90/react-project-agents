import { useMutation } from "@tanstack/react-query";

export function useCreateRoom() {
  return (
    useMutation({
      mutationFn: async () => {},
    })
  );
};