import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres." }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema)
  });

  function handleCreateRoom(data: CreateRoomFormData) {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>Crie uma nova sala para receber perguntas e respontas da I.A.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...createRoomForm}>
          <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome da sala..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};