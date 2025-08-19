import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type GetRoomsAPIResponse = {
  id: string;
  name: string;
};

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const data: GetRoomsAPIResponse[] = await response.json();
      return data;
    },
  });

  return (
    <div>
      {isLoading && <div>Carregando...</div>}

      <div className="flex flex-col gap-1">
        {data?.map((room) => (
          <div key={room.id}>
            <Link to={`/room/${room.id}`} className="underline">
              {room.name}
            </Link>
          </div>
        ))}
      </div>

      <Link to="/room" className="underline">Acessar sala</Link>
    </div>
  );
};