import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("refresh_tokens", (table) => {
    table.increments("id").primary();
    table.string("token").unique().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("expires_at").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("refresh_tokens");
}

