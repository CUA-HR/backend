import express from "express";
import { CreateTeacherDTO } from "../dtos";
import { allTeachers, createTeacher, deleteTeacher, teacher, updateTeacher } from "../repository/teacher.repositories";
import { handleError } from "../../utils/errors";

export const CreateTeacher = async (req: express.Request, res: express.Response): Promise<CreateTeacherDTO | any> => {
    try {
        const {
            firstname,
            lastname,
            email,
            dob,
            matrialStatus,
            age,
            currentDegree,
            nextDegree,
            effectiveDate,
            highPostion,
            positionId,
            tierId,
        } = req.body;
        // Create an instance of UserDTO
        const createTeacherDTO = new CreateTeacherDTO(
            firstname,
            lastname,
            email,
            new Date(dob), // Ensure dob is a Date object
            matrialStatus,
            age,
            currentDegree,
            nextDegree,
            new Date(effectiveDate), // Ensure effectiveDate is a Date object
            highPostion,
            positionId,
            tierId,
        );
        const resutl = await createTeacher(createTeacherDTO);
        return res.status(200).json(resutl)
    } catch (error) {
        handleError((msg) => console.log(msg), 'An error occurred');
        return res.sendStatus(400);
    }
}

// export const AllTeachers = async (req: express.Request, res: express.Response): Promise<any> => {
//     try {
//         const resutl = await allTeachers();
//         return res.status(200).json(resutl)
//     } catch (error) {

//         handleError(() => console.log(error));
//         return res.sendStatus(400);
//     }
// }

// export const Teacher = async (req: express.Request, res: express.Response): Promise<any> => {
//     try {
//         const resutl = await teacher();
//         return res.status(200).json(resutl)
//     } catch (error) {

//         handleError(() => console.log(error));
//         return res.sendStatus(400);
//     }
// }

// export const UpdateTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
//     try {
//         const resutl = await updateTeacher();
//         return res.status(200).json(resutl)
//     } catch (error) {

//         handleError(() => console.log(error));
//         return res.sendStatus(400);
//     }
// }

// export const DeleteTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
//     try {
//         const resutl = await deleteTeacher(45);
//         return res.status(200).json(resutl)
//     } catch (error) {

//         handleError(() => console.log(error));
//         return res.sendStatus(400);
//     }
// }
