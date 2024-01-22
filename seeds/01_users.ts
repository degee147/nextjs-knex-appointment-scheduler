import { Knex } from "knex";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const users = [];
    const hashedPassword = bcrypt.hashSync('password', 10);

    for (let i = 0; i < 20; i++) {
        users.push({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            is_provider: faker.datatype.boolean()
        });
    }

    // Inserts seed entries
    await knex("users").insert(users);
};
