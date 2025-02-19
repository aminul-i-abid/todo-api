import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("refresh_tokens", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").notNullable();
    table.string("token").notNullable().unique();
    table.boolean("is_revoked").defaultTo(false);
    table.timestamp("expires_at").notNullable();
    table.timestamps(true, true);

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("refresh_tokens");
}
