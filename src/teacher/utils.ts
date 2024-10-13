import { getTierByName, tier } from "../tier/repository/tier.repositories";
import { CreateTeacherDTO } from "./dtos";
import { createTeacher } from "./repository/teacher.repositories";

// Function to create a teacher from the extracted data
export const createTeacherFromRow = async (createTeacherDTO: CreateTeacherDTO) => {
    return createTeacher(createTeacherDTO);
};


export const getTeacherTier = async (highPosition: boolean, tierId: number): Promise<any> => {
    if (highPosition)
        return (await getTierByName("دنيا")).id;
    return tierId;
}

