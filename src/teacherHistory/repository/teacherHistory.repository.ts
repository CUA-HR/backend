import { db } from '../../db/setup';
import { teachers, teachersHistory } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherHistoryDTO, UpdateTeacherHistoryDTO } from 'teacherHistory/dtos';
import { and } from 'drizzle-orm';

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
export const allTeachersHistories = async (): Promise<any[]> => {
    return (await db).select().from(teachersHistory).execute();
}


/// GET ONE TEACHER Histories
export const teacherHistories = async (teacherId: number): Promise<any[]> => {
    return (await db).select().from(teachersHistory).where(eq(teachersHistory.teacherId, teacherId)).execute();
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

