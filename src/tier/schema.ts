import { relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { durations } from "duration/schema";


export const tiers = mysqlTable("tiers", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    durationId: bigint("durationId", { mode: "number", unsigned: true }).notNull().references(() => durations.id),
});



export const tiersRelations = relations(tiers, ({ one }) => ({
    duration: one(durations, { fields: [tiers.durationId], references: [durations.id] })
}))