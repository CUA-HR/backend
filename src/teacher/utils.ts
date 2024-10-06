import { CreateTeacherDTO } from "./dtos";
import { createTeacher } from "./repository/teacher.repositories";

// Function to create a teacher from the extracted data
export const createTeacherFromRow = async (row: any, i: number) => {
    const createTeacherDTO = new CreateTeacherDTO(
        row[2],
        row[3],
        `test${i}@cu-aflou.edu.dz`,
        new Date(row[5]) || new Date("12-12-2000"),
        "أعزب",
        row[7],
        "0",
        "0",
        new Date(row[11]),
        true,
        2,
        2,
    );
    return createTeacher(createTeacherDTO);
};