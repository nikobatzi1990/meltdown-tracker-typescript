import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('tag_to_post').del();
    await knex('tags').del();
    await knex('posts').del();
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { id: 1, 
          username: "latteLove89", 
          email: "latteLove89@gmail.com",
          UID: "rfhur8549t498rfhfhhf4983",
          created_at: "March 31, 2023"
        },
        { id: 2, 
          username: "broHaHa",
          email: "broHaHa.com",
          UID: "bvbvrefreuf847539fh39eue",
          created_at: "August 18, 2023"
        },
        { id: 3, 
          username: "nickelAndDime",
          email: "i-Heart-Giraffes@gmail.com",
          UID: "hfr8rujfe390w9isq09wqw0",
          created_at: "September 5, 2023"
        }
    ]);
};
