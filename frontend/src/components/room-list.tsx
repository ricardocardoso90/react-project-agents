import { Badge } from "./ui/badge";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type GetRoomsAPIResponse = {
  id: string;
  name: string;
  questionsCount: number;
  createdAt: number;
};

export function RoomList() {
  const { data, isLoading } = useQuery({
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
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>Acesso rápido às salas mais recentes</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoading && <p className="text-muted-foreground text-sm">Carregando salas...</p>}

        {data?.map((room) => (
          <Link
            key={room.id}
            to={`/rooms/${room.id}`}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50"
          >

            <div className="flex-1 flex flex-col gap-1">
              <h3 className="font-medium ">{room.name}</h3>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {dayjs(room.createdAt).toNow()}
                </Badge>

                <Badge variant="secondary" className="text-xs">
                  {room.questionsCount} pergunta(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1 text-sm">
              Entrar <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
};