import express from "express";
import xlsx from "xlsx";
import fs from 'fs';
import moment from "moment";
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dtos";
import { allTeachers, createTeacher, deleteTeacher, teacher, updateTeacher } from "../repository/teacher.repositories";
import { handleError } from "../../utils/errors";
import { createTeacherFromRow, getTeacherTier } from "../utils";
import { createTeacherHistory, teacherLastHistory } from "../../teacherHistory/repository/teacherHistory.repository";
import { Degree, MatrialStatus } from "../teacher.enums";
import { tier } from "../../tier/repository/tier.repositories";
import { duration } from "../../duration/repository/duration.repository";

export const CreateTeacher = async (req: express.Request, res: express.Response): Promise<CreateTeacherDTO | any> => {
    try {
        const {
            firstname,
            lastname,
            email,
            dob,
            matrialStatus,
            age,
            debt,
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
            debt,
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
            debt,
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
            debt,
            currentDegree,
            nextDegree,
            new Date(effectiveDate), // Ensure effectiveDate is a Date object
            highPostion,
            positionId,
            tierId,
        );
        const result = await updateTeacher(updateTeacherDTO);
        return res.status(200).json(result)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeleteTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id } = req.params;
    try {
        const result = await deleteTeacher(Number(id));
        return res.status(200).json(result)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


// import feature
export const ImportTeachersXlsx = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const filePath = req.file.path;
        const {
            highPosition,
            tierId,
            positionId,
            worksheetIndex,
        } = req.query;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[Number(worksheetIndex) || 0]; // Assuming you want to read the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const csvData = xlsx.utils.sheet_to_csv(worksheet).split("\n").splice(3);
        for (const _ of csvData) {
            const row = _.split(",");
            const createTeacherDto = new CreateTeacherDTO(
                row[2],
                row[3],
                row[28] || null,
                new Date(row[5]) || null,
                row[6] as MatrialStatus || null,
                Number(row[7]),
                undefined,
                `${row[9]}` as Degree,
                `${row[10]}` as Degree,
                new Date(row[11]),
                Boolean(highPosition),
                Number(positionId),
                Number(tierId),
            );
            try {
                await createTeacherFromRow(createTeacherDto);
            } catch (error) {
                continue;
            }
        }
        // Clean up the uploaded file
        fs.unlinkSync(filePath); // Remove the temporary file

        return res.status(200).json({
            msg: `${csvData.length} field(s) was added.`
        });
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}



// upgrade teacher 
export const UpgradeTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        /* 
            step 1- Getting required data from the request body.
            step 2- Getting the teacher information.
                step 2.1- Getting the teacher history information.
            step 3- Getting the duration of the tier assigned to the teacher.
            step 4- Calculating the time from the effective date to the new year to make a decision (upgrade / don't upgrade).
        */

        let upgrade = false;
        let monthsToAdd = undefined;

        // step 1: Getting required data from the request body
        const {
            id,
            southernPrivilege, // إمتياز الجنوب
            professionalExperience, // الخبرة المهنية
        } = req.body;

        // step 2: Getting the teacher information
        const {
            highPostion,
            tierId,
            debt,
        } = await teacher(Number(id));
        // step 2.1: Getting teacher history information
        const {
            nextDegree,
            effectiveDate
        } = await teacherLastHistory(Number(id)) || { currentDegree: 0, nextDegree: 0, effectiveDate: new Date() };


        // note: All periods are in months
        // step 3: Getting duration of the tier assigned to the teacher
        const targetedTier = await getTeacherTier(highPostion, tierId);
        const durationId = (await tier(targetedTier)).durationId
        const targetedDuration = Number((await duration(durationId)).duration); // like: 2.6, 3, 3.6

        // step 4: Calculating the time from the effective date to the new year to make a decision (upgrade / don't upgrade)
        const nextYearFirstDay = moment(moment().endOf("year")).add(1, "days");
        const fromEffectiveDateToNextYear = Number(moment(nextYearFirstDay).diff(effectiveDate, "days") / 30);
        const totalMonths = Number(southernPrivilege) + Number(professionalExperience) + fromEffectiveDateToNextYear;
        const monthsToAddWithoutDebt = totalMonths - targetedDuration; // months to add to the effective date without the debt
        const monthsToAddWithDebt = monthsToAddWithoutDebt + debt; // months to add to the effective date with the debt


        if (monthsToAddWithoutDebt >= 0 || monthsToAddWithDebt >= targetedDuration) {
            upgrade = true;
            if (monthsToAddWithoutDebt < 0) { // with debt, so we should update the new debt
                const newDebt = Math.max(debt - targetedDuration, 0);
                await updateTeacher({ id: id, debt: newDebt });
                monthsToAdd = monthsToAddWithDebt;
            }
            monthsToAdd = monthsToAddWithoutDebt;
        } else {
            const decision = "Don't upgrade the teacher, conditions are not satisfied.";
            const monthsToAdd = monthsToAddWithDebt;
            const reason = "Nothing to add beacause months to add are less then targeted tier duration.";
            return res.status(200).json({ "total": totalMonths, "to add": Math.ceil(Number(monthsToAdd)), "tier": targetedDuration, "debt": debt, "decision": decision, "reason": reason })
        }

        if (upgrade) {
            const decision = "Upgrade the teacher."
            const newEffectiveDate = moment(effectiveDate).add(monthsToAdd, "months");
            const newHistory = await createTeacherHistory({ currentDegree: nextDegree.toString() as Degree, highPostion: highPostion, effectiveDate: effectiveDate, nextDegree: (parseInt(nextDegree.toString()) + 1).toString() as Degree, teacherId: id });
            await updateTeacher({ id: id, debt: 0 })
            return res.status(200).json({ "total": totalMonths, "to add": Math.ceil(Number(monthsToAdd)), "tier": targetedDuration, "debt": debt, "decision": decision, "newHistory": newHistory, "newEffectiveDate": newEffectiveDate })
        }


    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}