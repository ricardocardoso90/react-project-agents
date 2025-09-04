import { z } from "zod/v4";
import { db } from "../../db/connection.ts";

import type { FastifyInstance } from "fastify";
import { schema } from "../../db/schema/index.ts";

export function createQuestionRoute(app: FastifyInstance) {
  app.post("/rooms/:roomId/questions", {
    schema: {
      params: z.object({
        roomId: z.string(),
      }),
      body: z.object({
        question: z.string().min(1),
      }),
    },
  }, async ({ body }, reply) => {
    const { roomId } = body as { roomId: string };
    const { question } = body as { question: string };

    const result = await db.insert(schema.questions).values({
      roomId,
      question
    }).returning();

    const insertedQuestion = result[0];

    if (!insertedQuestion) {
      throw new Error("Failed to create new room.");
    };

    return reply.status(201).send({ roomId: insertedQuestion.id })

  });
};