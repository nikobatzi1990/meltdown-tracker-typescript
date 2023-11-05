import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tag_to_post', function (table) {
    table.integer('tag_id')
      .references('id')
      .inTable('tags')
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.integer('post_id')
      .references('id')
      .inTable('posts')
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.primary(['tag_id','post_id']);
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tag_to_post');
};

