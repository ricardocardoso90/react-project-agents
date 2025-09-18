import type { FastifyInstance } from "fastify";

import { count, eq, desc, asc } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export function getRoomsRoute(app: FastifyInstance) {
  app.get("/rooms", async () => {
    const rows = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.rooms.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id)
      .orderBy(asc(schema.rooms.name));

    return rows.map((row) => ({
      ...row,
      questionsCount: Number(row.questionsCount ?? 0),
    }));
  });
};