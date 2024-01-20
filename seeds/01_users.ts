import { Knex } from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const users = [];

    for (let i = 0; i < 20; i++) {
        users.push({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_provider: faker.datatype.boolean()
        });
    }

    // Inserts seed entries
    await knex("users").insert(users);
};
