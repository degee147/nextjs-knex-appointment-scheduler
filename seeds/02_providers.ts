import { Knex } from "knex";
import { faker } from '@faker-js/faker';

function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries in providers
    await knex("providers").del();

    // Fetch user IDs for providers from the users table
    const providerUserIds = await knex("users")
        .select("id")
        .where("is_provider", true);

    // Inserts seed entries for providers
    const providers = providerUserIds.map(user => ({
        user_id: user.id,
        title: faker.name.jobTitle(),
        phone: faker.phone.number(),
        bio: faker.lorem.sentence(),
        specialization: getRandomElement(['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Surgeon', 'Physiotherapist']),
        image: faker.image.avatar()
    }));

    await knex("providers").insert(providers);
};
