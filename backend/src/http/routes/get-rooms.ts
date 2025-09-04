import type { FastifyInstance } from "fastify";

import { count, eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export function getRoomsRoute(app: FastifyInstance) {
  app.get("/rooms", async () => {
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.rooms.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id)
      .orderBy(schema.rooms.name);

    return results;
  });
};