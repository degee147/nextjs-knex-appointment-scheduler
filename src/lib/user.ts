import db from '../../utils/database';
import { User } from '../../src/@types';


export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    const user = await db('users').where({ email }).first();
    return user;
};

export const createUser = async (name: string, email: string, hashedPassword: string, is_provider: boolean): Promise<number> => {

    const user: User = {
        // id: "",
        name: name,
        email: email,
        password: hashedPassword,
        is_provider: is_provider,
    };

    try {
        const insertedId = await db('users').insert(user).returning('id');
        // const insertedId = await db('users').insert(user);
        console.log("insertedId",insertedId);
        return insertedId[0]?.id;
    } catch (error) {
        console.error('Error inserting user:', error);
    }

    return 0;
};

export const users = async (): Promise<any> => {
    const users = await db('users').select('*');
    return users;
};