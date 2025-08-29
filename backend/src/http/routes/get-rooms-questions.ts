import { z } from "zod/v4";
import { desc, eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";

import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export function getRoomQuestions(app: FastifyInstance) {
  app.get("/rooms/:roomId/questions", {
    schema: {
      params: z.object({
        roomId: z.string(),
      })
    }
  }, async ({ params }) => {
    const { roomId } = params as { roomId: string };

    const result = await db
      .select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
      })
      .from(schema.questions)
      .where(
        eq(schema.questions.roomId, roomId),
      )
      .orderBy(desc(schema.questions.createdAt))

    return result;
  });
};