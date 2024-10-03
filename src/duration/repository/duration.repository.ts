import { durations } from "db/schema";
import { db } from "../../db/setup";
import { CreateDurationDTO, UpdateDurationDTO } from "duration/dtos";
import { eq } from "drizzle-orm";

export const createDuration = async (createDuration: CreateDurationDTO): Promise<CreateDurationDTO> => {
    try {
        await (await db).insert(durations).values(createDuration).execute();
        return createDuration;
    } catch (error) {
        throw new Error('Failed to create Position'); // Handle errors appropriately
    }
}
/// GET ALL Durations
export const allDurations = async (): Promise<any[]> => {
    return (await db).select().from(durations);
}

/// GET ONE Duration
export const duration = async (id: number): Promise<any[]> => {
    return (await db).select().from(durations).where(eq(durations.id, id));
}


/// UPDATE ONE Duration
export const updateDuration = async (updatePositionDTO: UpdateDurationDTO): Promise<any[]> => {
    return (await db).update(durations).set(updatePositionDTO).where(eq(durations.id, updatePositionDTO.id)).execute();
}


/// DELETE ONE Duration
export const deleteDuration = async (id: number): Promise<any[]> => {
    return (await db).delete(durations).where(eq(durations.id, id)).execute();
}

