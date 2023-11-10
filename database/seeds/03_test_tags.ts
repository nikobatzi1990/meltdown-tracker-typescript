import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('tags').insert([
    { id: 1, 
      user_id: "1",
      tag_name: "loud noise",
      times_used: "1",
    },
    { id: 2, 
      user_id: "2",
      tag_name: "strangers",
      times_used: "4",
    },
    { id: 3, 
      user_id: "1",
      tag_name: "late meal",
      times_used: "2",
    },
  ]);
};