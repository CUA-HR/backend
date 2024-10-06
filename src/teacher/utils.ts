import { CreateTeacherDTO } from "./dtos";
import { createTeacher } from "./repository/teacher.repositories";

// Function to create a teacher from the extracted data
export const createTeacherFromRow = async (row: any) => {
    const createTeacherDTO = new CreateTeacherDTO(
        row.firstname,
        row.lastname,
        row.email,
        new Date(row.dob),
        row.matrialStatus,
        row.age,
        row.currentDegree,
        row.nextDegree,
        new Date(row.effectiveDate),
        row.highPostion,
        row.positionId,
        row.tierId,
    );
    return createTeacher(createTeacherDTO);
};