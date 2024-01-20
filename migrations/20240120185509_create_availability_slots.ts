import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('provider_availability', table => {
        table.increments('id').primary();
        table.integer('provider_id').unsigned().notNullable();
        table.enu('day_of_week', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).notNullable();
        table.time('start_time').notNullable();
        table.time('end_time').notNullable();
        table.integer('slot_duration').notNullable(); // Duration in minutes
        table.timestamps(true, true);

        table.foreign('provider_id').references('providers.id');
    });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('availability_slots');
}

