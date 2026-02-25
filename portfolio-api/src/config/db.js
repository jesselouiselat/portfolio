import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DB_DIRECT_CONNECTION_STRING,
});
