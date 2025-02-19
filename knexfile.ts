import type { Knex } from "knex";
import databaseConfig from "./src/config/database";

const config: { [key: string]: Knex.Config } = {
  development: {
    ...databaseConfig,
    debug: true,
  },
  production: {
    ...databaseConfig,
    debug: false,
  },
};

export default config;
