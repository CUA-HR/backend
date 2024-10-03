import { CreateDurationDTO, UpdateDurationDTO } from "duration/dtos";
import { allDurations, createDuration, deleteDuration, duration, updateDuration } from "../repository/duration.repository";
import express from "express";
import { handleError } from "utils/errors";

export const CreateDuration = async (req: express.Request, res: express.Response): Promise<CreateDurationDTO | any> => {
    try {
        const {
            name
        } = req.body;
        // Create an instance of UserDTO
        const createDurationDTO = new CreateDurationDTO(name);
        const resutl = await createDuration(createDurationDTO);
        return res.status(200).json(resutl)
    } catch (error) {
        handleError((msg) => console.log(msg), 'An error occurred');
        return res.sendStatus(400);
    }
}


export const AllDurations = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const resutl = await allDurations();
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const Duration = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id } = req.params;
        const resutl = await duration(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const UpdateDuration = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {
            id,
            name,
        } = req.body;
        // Create an instance of UserDTO
        const updateDurationDTO = new UpdateDurationDTO(
            id,
            name,
        );
        const resutl = await updateDuration(updateDurationDTO);
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeleteDuration = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id } = req.params;
    try {
        const resutl = await deleteDuration(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}
