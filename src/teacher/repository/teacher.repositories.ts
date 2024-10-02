import { db } from '../../db/setup';
import { teachers, teachersHistory } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherDTO, UpdateTeacherDTO } from 'teacher/dtos';

// CREATE ONE TEACHER
export const createTeacher = async (createTeacher: CreateTeacherDTO): Promise<CreateTeacherDTO> => {
    try {
        await (await db).transaction(async (tx) => {
            const result = await (await db).insert(teachers).values({
                firstname: createTeacher.firstname,
                lastname: createTeacher.lastname,
                email: createTeacher.email,
                dob: createTeacher.dob,
                matrialStatus: createTeacher.matrialStatus,
                positionId: createTeacher.positionId,
                tierId: createTeacher.tierId,
            }).execute();
            await tx.insert(teachersHistory).values({
                currentDegree: createTeacher.currentDegree,
                nextDegree: createTeacher.nextDegree,
                effectiveDate: createTeacher.effectiveDate,
                teacherId: result[0].insertId
            })
        })
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
export const teacher = async (id: number): Promise<any[]> => {
    return (await db).select().from(teachers).where(eq(teachers.id, id));
}


/// UPDATE ONE TEACHER
export const updateTeacher = async (updateTeacherDTO: UpdateTeacherDTO): Promise<any[]> => {
    return (await db).update(teachers).set(updateTeacherDTO).where(eq(teachers.id, updateTeacherDTO.id)).execute();
}


/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<any[]> => {
    return (await db).delete(teachers).where(eq(teachers.id, id)).execute();
}

