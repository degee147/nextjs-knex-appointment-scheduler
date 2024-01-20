import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('time_slots', table => {
        table.increments('id').primary();
        table.integer('provider_id').unsigned().notNullable();
        table.datetime('start_time').notNullable();
        table.datetime('end_time').notNullable();
        table.boolean('is_booked').defaultTo(false);

        table.foreign('provider_id').references('providers.id');
        table.timestamps(true, true); 
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('time_slots');
}

