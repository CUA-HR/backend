import { durations } from "../../db/schema";
import { db } from "../../db/setup";
import { CreateDurationDTO, DurationDTO, UpdateDurationDTO } from "../dtos";
import { eq } from "drizzle-orm";

export const createDuration = async (createDuration: CreateDurationDTO): Promise<DurationDTO> => {
    try {
        const id = (await (await db).insert(durations).values(createDuration).execute())[0].insertId;
        const resutl = await duration(id);
        return resutl;
    } catch (error) {
        throw new Error('Failed to create Position'); // Handle errors appropriately
    }
}
/// GET ALL Durations
export const allDurations = async (): Promise<any[]> => {
    return (await db).select().from(durations);
}

/// GET ONE Duration
export const duration = async (id: number): Promise<DurationDTO> => {
    const resutl = await (await db).select().from(durations).where(eq(durations.id, id))
    return new DurationDTO(
        resutl[0].id,
        resutl[0].duration,
        resutl[0].createdAt,
        resutl[0].updatedAt
    );
}


/// UPDATE ONE Duration
export const updateDuration = async (updatePositionDTO: UpdateDurationDTO): Promise<DurationDTO> => {
    const id = (await (await db).update(durations).set(updatePositionDTO).where(eq(durations.id, updatePositionDTO.id)).execute())[0].insertId;
    return duration(id);
}


/// DELETE ONE Duration
export const deleteDuration = async (id: number): Promise<number> => {
    const resutl = (await (await db).delete(durations).where(eq(durations.id, id)).execute())[0].insertId;
    return resutl;
}

