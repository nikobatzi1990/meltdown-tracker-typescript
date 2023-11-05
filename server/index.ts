import setUpServer from "./server";
import knex from "../database/knex";

const PORT = process.env.PORT || 8000;
const server = setUpServer();

(async () => {
  try {
    await knex.migrate.latest();
    server.listen(PORT, () => {
      console.log(`App is listening @ http://localhost:${PORT}`);
    })
  } catch (err) {
    console.error(`app failed to start: ${err}`);
  }
})();