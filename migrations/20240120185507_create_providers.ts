import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('providers', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.string('title').notNullable();
        table.string('phone').notNullable();
        table.text('bio');
        table.string('specialization').nullable();
        table.string('image').nullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('providers');
}

