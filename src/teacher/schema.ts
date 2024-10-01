import { relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar, date, mysqlEnum, int, boolean } from "drizzle-orm/mysql-core";
import { positions } from "position/schema";
import { tiers } from "tier/schema";


export const teachers = mysqlTable("teachers", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    firstname: varchar("firstname", { length: 256 }).notNull(),
    lastname: varchar("lastname", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    dob: date("dob", { mode: "date" }).notNull(),
    matrialStatus: mysqlEnum('matrialStatus', ['متزوج', 'أعزب']).notNull(),
    age: int("age"),
    currentDegree: mysqlEnum("currentDegree", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "12"]).notNull(),
    nextDegree: mysqlEnum("nextDegree", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "12"]).notNull(),
    effectiveDate: date("effectiveDate", { mode: "date" }).notNull(),
    highPostion: boolean("highPostion").notNull().$default(() => false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    tierId: bigint("tierId", { mode: "number", unsigned: true }).notNull().references(() => tiers.id),
    postionId: bigint("postionId", { mode: "number", unsigned: true }).notNull().references(() => positions.id),
});

export const teachersRelations = relations(teachers, ({ one }) => ({
    tier: one(tiers, { fields: [teachers.tierId], references: [tiers.id] }),
    postion: one(positions, { fields: [teachers.postionId], references: [positions.id] })
}))
