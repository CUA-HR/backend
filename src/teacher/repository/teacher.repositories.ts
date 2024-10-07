import { db } from '../../db/setup';
import { teachers } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherDTO, UpdateTeacherDTO } from 'teacher/dtos';
import { createTeacherHistory } from '../../teacherHistory/repository/teacherHistory.repository';
import { CreateTeacherHistoryDTO } from '../../teacherHistory/dtos';

// CREATE ONE TEACHER
export const createTeacher = async (createTeacher: CreateTeacherDTO): Promise<CreateTeacherDTO> => {
    try {
        await (await db).transaction(async (tx) => {
            const result = await (await db).insert(teachers).values(createTeacher).execute();
            const { currentDegree, nextDegree, effectiveDate } = createTeacher;
            const teacherId = result[0].insertId
            const createTeacherHistoryDTO = new CreateTeacherHistoryDTO(teacherId, currentDegree, nextDegree, effectiveDate)
            await createTeacherHistory(createTeacherHistoryDTO);
        })
        return createTeacher; // Assuming `insertId` is returned
    } catch (error) {
        console.log(error)
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

