import type { FastifyInstance } from "fastify";

import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export function getRoomsRoute(app: FastifyInstance) {
  app.get("/rooms", async () => {
    const result = await db
      .select()
      .from(schema.rooms)
      .orderBy(schema.rooms.name);

    return result;
  });
};