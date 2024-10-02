import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const initializeDatabase = async () => {
    const connection = await mysql.createConnection({
        host: process.env.HOST, // replace with your host
        user: "root", // replace with your username
        password: "root", // replace with your password
        database: "CUAHR", // replace with your database name
    });
    return drizzle(connection);
};

// Immediately initialize the database
const db = initializeDatabase();

export { db };