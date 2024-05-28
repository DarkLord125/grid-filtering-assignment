import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema"
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("No database found");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDB = async () => {
  try {
    console.log("Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Migrated successfully");
  } catch (err) {
    console.log("Failed to migrate client");
  }
};
migrateDB();

export default db;
