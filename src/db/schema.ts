import { relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar, text, mysqlEnum, int, date, boolean } from "drizzle-orm/mysql-core";


/// USER SCHEMA
export const users = mysqlTable("users", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    roleId: bigint("roleId", { mode: "number", unsigned: true }).notNull().references(() => roles.id),
});

export const logs = mysqlTable("logs", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    details: text("details"),

    userId: bigint("userId", { mode: "number", unsigned: true }).notNull().references(() => users.id),
})

export const roles = mysqlTable("roles", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
})

export const userRelations = relations(users, ({ one }) => ({
    role: one(roles, { fields: [users.roleId], references: [roles.id] }),
}))

export const logsRelations = relations(logs, ({ one }) => ({
    user: one(users, { fields: [logs.userId], references: [users.id] }),
}))


/// TEACHER SCHEMA
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
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    tierId: bigint("tierId", { mode: "number", unsigned: true }).notNull().references(() => tiers.id, { onDelete: "cascade" }),
    positionId: bigint("positionId", { mode: "number", unsigned: true }).notNull().references(() => positions.id, { onDelete: "cascade" }),
});

export const teachersRelations = relations(teachers, ({ one }) => ({
    tier: one(tiers, { fields: [teachers.tierId], references: [tiers.id] }),
    postion: one(positions, { fields: [teachers.positionId], references: [positions.id] })
}))

export const teachersHistory = mysqlTable("teachersHistory", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    currentDegree: mysqlEnum("currentDegree", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "12"]).notNull(),
    nextDegree: mysqlEnum("nextDegree", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "12"]).notNull(),
    effectiveDate: date("effectiveDate", { mode: "date" }).notNull(),
    highPostion: boolean("highPostion").notNull().$default(() => false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    teacherId: bigint("teacherId", { mode: "number", unsigned: true }).notNull().references(() => teachers.id, { onDelete: "cascade" }),
})

export const teachersHistoryRealtions = relations(teachersHistory, ({ one }) => ({
    teacher: one(teachers, {
        fields: [teachersHistory.teacherId],
        references: [teachers.id]
    },)
}))

/// TIER SCHEMA
export const tiers = mysqlTable("tiers", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    durationId: bigint("durationId", { mode: "number", unsigned: true }).notNull().references(() => durations.id, { onDelete: "cascade" }),
});



export const tiersRelations = relations(tiers, ({ one }) => ({
    duration: one(durations, { fields: [tiers.durationId], references: [durations.id] })
}))

/// DURATION SCHEMA
export const durations = mysqlTable("durations", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    duration: varchar("duration", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});


/// POSTION SCHEMA
export const positions = mysqlTable("positions", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
