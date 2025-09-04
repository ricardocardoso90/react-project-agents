import { z } from "zod";
import { db } from "../../db/connection.ts";

import type { FastifyInstance } from "fastify";
import { schema } from "../../db/schema/index.ts";

export function createRoomRoute(app: FastifyInstance) {
  app.post("/rooms", {
    schema: {
      body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    },
  }, async ({ body }, reply) => {
    const { name, description } = body as { name: string; description?: string };

    const result = await db.insert(schema.rooms).values({
      name,
      description: description || "",
    }).returning();

    const insertedRoom = result[0];

    if (!insertedRoom) {
      throw new Error("Failed to create new room.");
    };

    return reply.status(201).send({ roomId: insertedRoom.id })

  });
};