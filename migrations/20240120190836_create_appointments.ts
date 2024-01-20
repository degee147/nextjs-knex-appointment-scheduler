import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('appointments', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('provider_id').unsigned().notNullable();
        table.integer('time_slot_id').unsigned().notNullable();
        table.timestamp('appointment_date').notNullable(); //exact date and time of appointment
        table.timestamps(true, true); 

        table.foreign('user_id').references('users.id');
        table.foreign('provider_id').references('providers.id');
        table.foreign('time_slot_id').references('time_slots.id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('appointments');
}

