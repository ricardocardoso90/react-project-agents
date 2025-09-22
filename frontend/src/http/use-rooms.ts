import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-response";

export function useRooms() {
  return (
    useQuery({
      queryKey: ["get-rooms"],
      queryFn: async () => {
        const response = await fetch("http://localhost:3333/rooms");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        };
        const data: GetRoomsResponse[] = await response.json();
        return data;
      },
    })
  );
};