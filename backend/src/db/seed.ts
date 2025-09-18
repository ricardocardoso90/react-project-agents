import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await sql`TRUNCATE TABLE "questions" RESTART IDENTITY CASCADE`;
await sql`TRUNCATE TABLE "rooms" RESTART IDENTITY CASCADE`;

const createdRooms = await Promise.all(
  Array.from({ length: 5 }).map(async (_, index) => {
    const [room] = await db.insert(schema.rooms).values({
      name: `Sala ${index + 1}`,
      description: `Description for room ${index + 1}`,
    }).returning();
    return room;
  })
);

for (const room of createdRooms) {
  await Promise.all(
    Array.from({ length: 5 }).map((_, qIndex) => db.insert(schema.questions).values({
      roomId: room.id,
      question: `Question ${qIndex + 1} for room ${room.name}`,
    }))
  );
}

await sql.end();

console.log("DATABASE SEEDED");