import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex('posts').insert([
        { id: 1, 
          title: "Laura's Baby Shower", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
          user_id: "1",
          time_of_day: "night",
          created_at: "April 2, 2023",
          flagged: "true",
          intensity: "4"

        },
        { id: 2, 
          title: "Halloween", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
          user_id: "3",
          time_of_day: "afternoon",
          created_at: "October 31, 2023",
          flagged: "false",
          intensity: "5"
        },
        { id: 3, 
          title: "McDonald's Parking Lot", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
          user_id: "1",
          time_of_day: "morning",
          created_at: "April 2, 2023",
          flagged: "false",
          updated_at: "April 3, 2023",
          intensity: "2"
        }
    ]);
};
