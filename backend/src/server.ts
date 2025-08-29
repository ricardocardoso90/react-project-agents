import { env } from "./env.ts";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { createRoomRoute } from "./http/routes/create-room.ts";
import { getRoomQuestions } from "./http/routes/get-rooms-questions.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/health', (req, res) => {
  res.send('Deu certo!');
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestions);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Port:  ${process.env.PORT}`);
  console.log("Servidor rodando com Sucesso!!");
});