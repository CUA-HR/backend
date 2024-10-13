import { db } from '../../db/setup';
import { teachers } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTeacherDTO, TeacherDTO, UpdateTeacherDTO } from '../dtos';
import { createTeacherHistory } from '../../teacherHistory/repository/teacherHistory.repository';
import { CreateTeacherHistoryDTO } from '../../teacherHistory/dtos';
import { MatrialStatus } from 'teacher/teacher.enums';

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
export const teacher = async (id: number): Promise<TeacherDTO> => {
    const result = await (await db).select().from(teachers).where(eq(teachers.id, id));
    return new TeacherDTO(
        result[0].id,
        result[0].firstname,
        result[0].lastname,
        result[0].email,
        result[0].dob,
        result[0].matrialStatus as MatrialStatus,
        result[0].age,
        result[0].highPostion,
        result[0].createdAt,
        result[0].updatedAt,
        result[0].tierId,
        result[0].positionId,
    );
}


/// UPDATE ONE TEACHER
export const updateTeacher = async (updateTeacherDTO: UpdateTeacherDTO): Promise<any[]> => {
    return (await db).update(teachers).set(updateTeacherDTO).where(eq(teachers.id, updateTeacherDTO.id)).execute();
}


/// DELETE ONE TEACHER
export const deleteTeacher = async (id: number): Promise<any[]> => {
    return (await db).delete(teachers).where(eq(teachers.id, id)).execute();
}

