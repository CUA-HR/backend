import { db } from '../../db/setup';
import { teachers, teachersHistory } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherHistoryDTO, UpdateTeacherHistoryDTO, TeacherHistoryDTO } from '../dtos';
import { and } from 'drizzle-orm';
import { Degree } from '../../teacher/teacher.enums';

// CREATE ONE TEACHER History
export const createTeacherHistory = async (createTeacherHistory: CreateTeacherHistoryDTO): Promise<CreateTeacherHistoryDTO> => {
    try {
        await (await db).insert(teachersHistory).values(createTeacherHistory).execute();
        return createTeacherHistory; // Assuming `insertId` is returned
    } catch (error) {
        throw new Error('Failed to create teacher'); // Handle errors appropriately
    }
};

/// GET ALL TEACHERS History
export const allTeachersHistories = async (): Promise<TeacherHistoryDTO[]> => {
    const results = await (await db).select().from(teachersHistory).execute();
    // Map the results to TeacherHistoryDTO
    return results.map(result => new TeacherHistoryDTO(
        result.id,
        result.currentDegree as Degree, // Ensure the type matches Degree
        result.nextDegree as Degree, // Ensure the type matches Degree
        result.effectiveDate,
        result.highPostion,
        result.southernPrivilege,
        result.professionalExperience,
        result.createdAt,
        result.updatedAt,
        result.teacherId
    ));
}


/// GET ONE TEACHER Histories
export const teacherHistories = async (teacherId: number): Promise<any[]> => {
    return (await db).select().from(teachersHistory).where(eq(teachersHistory.teacherId, teacherId)).execute();
}

// GET LAST TEACHER HISTORY
export const teacherLastHistory = async (teacherId: number): Promise<TeacherHistoryDTO> => {
    const result = await (await db).select().from(teachersHistory).where(eq(teachersHistory.teacherId, teacherId)).limit(1).execute();
    return new TeacherHistoryDTO(
        result[0].id,
        result[0].currentDegree as Degree, // Ensure the type matches Degree
        result[0].nextDegree as Degree, // Ensure the type matches Degree
        result[0].effectiveDate,
        result[0].highPostion,
        result[0].southernPrivilege,
        result[0].professionalExperience,
        result[0].createdAt,
        result[0].updatedAt,
        result[0].teacherId
    )
}

/// GET ONE TEACHER History
export const teacherHistory = async (id: number, teacherId: number): Promise<any[]> => {
    return (await db).select().from(teachersHistory).where(and(eq(teachersHistory.id, id), eq(teachersHistory.teacherId, teacherId))).execute();
}


/// UPDATE ONE TEACHER History
export const updateTeacherHistory = async (updateTeacherHistoryDTO: UpdateTeacherHistoryDTO): Promise<any[]> => {
    return (await db).update(teachersHistory).set(updateTeacherHistoryDTO).where(and(eq(teachersHistory.id, updateTeacherHistoryDTO.id), eq(teachersHistory.teacherId, updateTeacherHistoryDTO.teacherId))).execute();
}


/// DELETE ONE TEACHER History
export const deleteTeacherHistory = async (id: number, teacherId: number): Promise<any[]> => {
    return (await db).delete(teachersHistory).where(and(eq(teachersHistory.id, id), eq(teachersHistory.teacherId, teacherId))).execute();
}

