import express from "express";
import { CreateTierDTO, UpdateTierDTO } from "../dtos";
import { handleError } from "../../utils/errors";
import { allTiers, createTier, deleteTier, tier, updateTier } from "../repository/tier.repositories";


export const CreateTier = async (req: express.Request, res: express.Response): Promise<CreateTierDTO | any> => {
    try {
        const {
            name,
            durationId
        } = req.body;
        // Create an instance of UserDTO
        const createTierDTO = new CreateTierDTO(name, durationId);
        const resutl = await createTier(createTierDTO);
        return res.status(200).json(resutl)
    } catch (error) {
        handleError((msg) => console.log(msg), 'An error occurred');
        return res.sendStatus(400);
    }
}

export const AllTiers = async (req: express.Request, res: express.Response): Promise<any> => {

    try {
        const resutl = await allTiers();
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const Tier = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id } = req.params;
        const resutl = await tier(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const UpdateTier = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {
            id,
            name,
            durationId
        } = req.body;
        // Create an instance of UserDTO
        const updateTierDTO = new UpdateTierDTO(
            id,
            name,
            durationId
        );
        const resutl = await updateTier(updateTierDTO);
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeleteTier = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id } = req.params;
    console.log(id)
    try {
        const resutl = await deleteTier(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}
