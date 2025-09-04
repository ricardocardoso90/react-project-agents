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
  }, async (request, reply) => {
    const { roomId } = request.params as { roomId: string };
    const { question } = request.body as { question: string };

    try {
      const result = await db.insert(schema.questions).values({
        roomId,
        question
      }).returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error("Failed to create new question.");
      }

      return reply.status(201).send({ question: insertedQuestion });
    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });
};
