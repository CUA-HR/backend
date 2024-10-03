import express from "express";
import { handleError } from "../../utils/errors";
import { CreateTeacherHistoryDTO, UpdateTeacherHistoryDTO } from "teacherHistory/dtos";
import { allTeachersHistories, createTeacherHistory, deleteTeacherHistory, teacherHistories, teacherHistory, updateTeacherHistory } from "teacherHistory/repository/teacherHistory.repository";

export const CreateTeacherHistory = async (req: express.Request, res: express.Response): Promise<CreateTeacherHistoryDTO | any> => {
    try {
        const {
            teacherId,
            currentDegree,
            nextDegree,
            effectiveDate,
            highPostion,
        } = req.body;
        // Create an instance of UserDTO
        const createTeacherHistoryDTO = new CreateTeacherHistoryDTO(
            teacherId,
            currentDegree,
            nextDegree,
            new Date(effectiveDate), // Ensure effectiveDate is a Date object
            highPostion,
        );
        const resutl = await createTeacherHistory(createTeacherHistoryDTO);
        return res.status(200).json(resutl)
    } catch (error) {
        handleError((msg) => console.log(msg), 'An error occurred');
        return res.sendStatus(400);
    }
}

export const AllTeachersHistories = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const resutl = await allTeachersHistories();
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const TeacherHistories = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { teacherId } = req.params;
        const resutl = await teacherHistories(Number(teacherId));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const TeacherHistory = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id, teacherId } = req.params;
        const resutl = await teacherHistory(Number(id), Number(teacherId));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


export const UpdateTeacherHistory = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {
            id,
            teacherId,
            currentDegree,
            nextDegree,
            effectiveDate,
            highPostion,
        } = req.body;
        // Create an instance of UserDTO
        const updateTeacherDTO = new UpdateTeacherHistoryDTO(
            id,
            teacherId,
            currentDegree,
            nextDegree,
            new Date(effectiveDate), // Ensure effectiveDate is a Date object
            highPostion,
        );
        const resutl = await updateTeacherHistory(updateTeacherDTO);
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeleteTeacherHistory = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id, teacherId } = req.params;
    try {
        const resutl = await deleteTeacherHistory(Number(id), Number(teacherId));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}
