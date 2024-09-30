import { bigint, mysqlTable, timestamp, varchar, date, mysqlEnum, int, boolean } from "drizzle-orm/mysql-core";


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
});
