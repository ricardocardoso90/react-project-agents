import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function CreateRoomForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>Crie uma nova sala para receber perguntas e respontas da I.A.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4">

        </form>
      </CardContent>
    </Card>
  )
};