import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name', 250).notNullable();
        table.string('email', 250).notNullable().unique();
        table.string('password', 250).notNullable();
        table.boolean('is_provider').notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

