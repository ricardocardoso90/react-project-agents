import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, sql } from "./connection.ts";

await migrate(db, { migrationsFolder: "src/db/migrations" });
await sql.end();

console.log("DATABASE MIGRATED");

