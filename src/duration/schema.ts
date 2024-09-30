import { bigint, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";


export const durations = mysqlTable("durations", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    duration: varchar("duration", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
