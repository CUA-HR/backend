import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "./lib/db";

migrate(db, { migrationsFolder: "./drizzle" }).catch((err) => {
  console.error("DB ERROR: ", err);
});
