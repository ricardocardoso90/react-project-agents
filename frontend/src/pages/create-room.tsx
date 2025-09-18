import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type GetRoomsAPIResponse = {
  id: string;
  name: string;
};

export function CreateRoom() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: GetRoomsAPIResponse[] = await response.json();
      return data;
    },
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>Salas recentes</CardTitle>
              <CardDescription>Acesso rápido às salas mais recentes</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              {data?.map((room) => (
                <div key={room.id}>
                  <div>

                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};