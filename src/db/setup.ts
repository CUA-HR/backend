import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

if (!process.env.DATABASE_URL) {
    throw new Error("DB credentials error");
}
const connection = mysql.createConnection(process.env.DATABASE_URL);

export const db = drizzle(connection);
