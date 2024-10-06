import express from "express";
import xlsx from "xlsx";
import fs from 'fs';
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dtos";
import { allTeachers, createTeacher, deleteTeacher, teacher, updateTeacher } from "../repository/teacher.repositories";
import { handleError } from "../../utils/errors";
import { createTeacherFromRow } from "teacher/utils";

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

export const AllTeachers = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const resutl = await allTeachers();
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const Teacher = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id } = req.params;
        const resutl = await teacher(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const UpdateTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {
            id,
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
        const updateTeacherDTO = new UpdateTeacherDTO(
            id,
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
        const resutl = await updateTeacher(updateTeacherDTO);
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeleteTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id } = req.params;
    try {
        const resutl = await deleteTeacher(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


// import feature
export const ImportTeachersXlsx = async (req: express.Request, res: express.Response): Promise<any> => {

    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        console.log(jsonData)
        // const results = [];
        // for (const row of jsonData) {
        //     const result = await createTeacherFromRow(row);
        //     results.push(result);
        // }


        // // Clean up the uploaded file
        // fs.unlinkSync(filePath); // Remove the temporary file

        // return res.status(200).json(results);
        return res.status(200).json("done");
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}