import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

let pool;

if (ENV.DATABASE_URL) {
  pool = new Pool({
    connectionString: ENV.DATABASE_URL,
  });
} else {
  pool = new Pool({
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
  });
}

export { pool };
