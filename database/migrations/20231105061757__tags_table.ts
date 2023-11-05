import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tags', function (table) {
    table.increments('id')
      .unique();
    table.integer('user_id')
      .notNullable();
    table.foreign('user_id')
      .references('id')
      .inTable('users');
    table.string('tag_name')
      .notNullable();
    table.integer('times_used')
      .notNullable();
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tags');
};

