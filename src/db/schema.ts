import { logs, logsRelations, roles, userRelations, users } from "user/schema";
import { teachers, teachersRelations } from "teacher/schema";
import { positions } from "position/schema";
import { durations } from "duration/schema";
import { tiers, tiersRelations } from "tier/schema";



module.exports = {
    // users
    users,
    userRelations,
    logs,
    logsRelations,
    roles,

    // teachers
    teachers,
    teachersRelations,

    // postions
    positions,

    // tiers
    tiers,
    tiersRelations,

    // durations
    durations,
}