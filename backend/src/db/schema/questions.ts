import { rooms } from "./rooms.ts";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),
  answer: text(),
  question: text().notNull(),
  roomId: uuid().references(() => rooms.id).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});