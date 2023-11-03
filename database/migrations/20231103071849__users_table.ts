import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username')
      .unique()
      .notNullable();
    table.string('email')
      .unique()
      .notNullable();
    table.string('UID')
      .unique()
      .notNullable();
    table.timestamp('created_at');
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}