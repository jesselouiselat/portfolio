import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// const pool = new Pool({
//   host: "db.dlrzrdxjgswxzcvenwel.supabase.co",
//   port: 5432,
//   user: "postgres",
//   password: "edxOZqJmzYJxFRGa",
//   database: "postgres",
// });

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
}

export { pool };
