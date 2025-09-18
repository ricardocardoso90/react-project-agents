import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ArrowRight } from "lucide-react";

type GetRoomsAPIResponse = {
  id: string;
  name: string;
  questionsCount: number;
  createdAt: number;
};

export function CreateRoom() {
  const { data } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      };
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
                <Link
                  key={room.id}
                  to={`/rooms/${room.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent">

                  <div className="flex-1">
                    <h3 className="font-medium ">
                      {room.name}
                    </h3>
                  </div>

                  <span className="flex items-center gap-1 text-sm">
                    Entrar <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};