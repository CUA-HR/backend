import { db } from '../../db/setup';
import { tiers } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTierDTO, UpdateTierDTO } from '../dtos';

// CREATE ONE Tier
export const createTier = async (createTier: CreateTierDTO): Promise<CreateTierDTO> => {
    try {

        const result = await (await db).insert(tiers).values(createTier).execute();
        return createTier; // Assuming `insertId` is returned
    } catch (error) {
        throw new Error('Failed to create Tiers'); // Handle errors appropriately
    }
};

/// GET ALL Tiers
export const allTiers = async (): Promise<any[]> => {
    return (await db).select().from(tiers);
}

/// GET ONE Tier
export const tier = async (id: number): Promise<any[]> => {
    return (await db).select().from(tiers).where(eq(tiers.id, id));
}


/// UPDATE ONE Tier
export const updateTier = async (updateTierDTO: UpdateTierDTO): Promise<any[]> => {
    return (await db).update(tiers).set(updateTierDTO).where(eq(tiers.id, updateTierDTO.id)).execute();
}


/// DELETE ONE Tier
export const deleteTier = async (id: number): Promise<any[]> => {
    return (await db).delete(tiers).where(eq(tiers.id, id)).execute();
}

