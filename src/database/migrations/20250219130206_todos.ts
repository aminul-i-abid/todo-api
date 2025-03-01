import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("todos", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").notNullable();
    table.string("title").notNullable();
    table.text("description");
    table.boolean("completed").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("todos");
}
