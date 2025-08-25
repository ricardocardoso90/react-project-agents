import z from "zod";
import type { FastifyInstance } from "fastify";

export function createRoomRoute(app: FastifyInstance) {
  app.post("/rooms", {
    schema: {
      body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    },
  }, async ({body}) => {
      const {name} = body;
  });
};