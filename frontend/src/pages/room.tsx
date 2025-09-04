import { Link, Navigate, useParams } from "react-router-dom";

type RoomParams = {
  id: string;
};

export function Room() {
  const { id } = useParams<RoomParams>();

  if (!id) return <Navigate replace to="/" />

  return (
    <div>
      <div>Room</div>

      {id}

      <Link to="/" className="underline">Página inicial</Link>
    </div>
  );
};