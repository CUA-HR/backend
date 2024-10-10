import { db } from '../../db/setup';
import { users } from '../../db/schema';
import { CreateUserDTO, UserDTO } from 'user/dtos';
import { eq } from 'drizzle-orm';


export const createUser = async (createUserDto: CreateUserDTO): Promise<UserDTO> => {
    try {
        const result = await (await db).insert(users).values(createUserDto).execute();
        const user = await getUserById(result[0].insertId);
        return user;
    } catch (error) {
        throw new Error('Failed to create User'); // Handle errors appropriately
    }
}

export const getUserByEmail = async (email: string): Promise<UserDTO | null> => {
    try {
        const result = await (await db).select().from(users).where(eq(users.email, email)).execute();
        // Return the first user or null if none found
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw new Error('Failed to get User'); // Handle errors appropriately
    }
}

export const getUserById = async (id: number): Promise<UserDTO | null> => {
    try {
        const result = await (await db).select().from(users).where(eq(users.id, id)).execute();
        // Return the first user or null if none found
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw new Error('Failed to get User'); // Handle errors appropriately
    }
}