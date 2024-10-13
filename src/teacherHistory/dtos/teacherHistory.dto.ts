import { Degree } from "teacher/teacher.enums";

export class TeacherHistoryDTO {
    id: number;
    currentDegree: Degree;
    nextDegree: Degree;
    effectiveDate: Date;
    highPostion: boolean;
    southernPrivilege: number;
    professionalExperience: number;
    createdAt: Date;
    updatedAt: Date;
    teacherId: number;
    constructor(
        id: number,
        currentDegree: Degree,
        nextDegree: Degree,
        effectiveDate: Date,
        highPostion: boolean,
        southernPrivilege: number,
        professionalExperience: number,
        createdAt: Date,
        updatedAt: Date,
        teacherId: number,
    ) {
        this.id = id,
        this.currentDegree = currentDegree,
        this.nextDegree = nextDegree,
        this.effectiveDate = effectiveDate,
        this.highPostion = highPostion,
        this.southernPrivilege = southernPrivilege,
        this.professionalExperience = professionalExperience,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt,
        this.teacherId = teacherId
    }
}