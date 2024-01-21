import db from '../../utils/database';
import { Provider } from '../../src/@types';

// Function to create a provider profile
export const createProviderProfile = async (userId: number, title: string, phone: string, bio: string, specialization: string, image: string): Promise<number> => {

    const profileId = await db('providers').insert({
        user_id: userId,
        title,
        phone,
        specialization,
        bio,
        image
    });

    return profileId[0];
};

export const updateProviderProfile = async (userId: number, title: string, phone: string, bio: string, specialization: string, image: string): Promise<void> => {
    await db('providers').where({ user_id: userId }).update({
        title,
        phone,
        specialization,
        bio,
        image
    });
};

export const getProviderProfile = async (userId: number): Promise<any> => {
    const profile = await db('providers').where({ user_id: userId }).first();
    return profile;
};