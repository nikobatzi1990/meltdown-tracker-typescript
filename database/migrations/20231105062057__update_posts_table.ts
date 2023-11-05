import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('posts', table => {
    table.timestamp('updated_at');
    table.string('intensity');
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('posts', function (table) {
    table.dropColumn('updated_at');
    table.dropColumn('intensity');
  });
};

