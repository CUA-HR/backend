import { teachers } from 'db/schema';
import { db } from 'db/setup';
import { eq } from 'drizzle-orm';


/// GET ALL TEACHERS
export const allTeachers = async (): Promise<any[]> => {
    return await db.select().from(teachers);
}

/// GET ONE TEACHER
export const teacher = async (): Promise<any[]> => {
    return await db.select().from(teachers);
}

/// CREATE ONE TEACHER
export const createTeacher = async (): Promise<any[]> => {
    return await db.select().from(teachers);
}

/// UPDATE ONE TEACHER
export const updateTeacher = async (): Promise<any[]> => {
    return await db.select().from(teachers);
}


/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<any[]> => {
    return await db.delete(teachers).where(eq(teachers.id, id));
}

