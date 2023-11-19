import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('tag_to_post').insert([
      { tag_id: 1, post_id: 1 },
      { tag_id: 2, post_id: 2 },
      { tag_id: 3, post_id: 3 },
  ]);
};
