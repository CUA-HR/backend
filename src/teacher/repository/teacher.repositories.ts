import { db } from '../../db/setup';
import { teachers } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherDTO } from 'teacher/dtos';

// CREATE ONE TEACHER
export const createTeacher = async (createTeacher: CreateTeacherDTO): Promise<CreateTeacherDTO> => {
    try {
        const result = await (await db).insert(teachers).values({ ...createTeacher }).execute();
        return createTeacher; // Assuming `insertId` is returned
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw new Error('Failed to create teacher'); // Handle errors appropriately
    }
};

/// GET ALL TEACHERS
export const allTeachers = async (): Promise<any[]> => {
    return (await db).select().from(teachers);
}

/// GET ONE TEACHER
export const teacher = async (): Promise<any[]> => {
    return (await db).select().from(teachers);
}


/// UPDATE ONE TEACHER
export const updateTeacher = async (): Promise<any[]> => {
    return (await db).select().from(teachers);
}


/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<any[]> => {
    return (await db).delete(teachers).where(eq(teachers.id, id));
}

