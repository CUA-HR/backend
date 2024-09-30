import { bigint, mysqlTable, timestamp, varchar, date, mysqlEnum, int, boolean } from "drizzle-orm/mysql-core";


export const positions = mysqlTable("positions", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
