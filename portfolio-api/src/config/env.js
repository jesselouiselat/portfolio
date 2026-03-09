import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",

  // local db - dev stage
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,

  // supabase db - prod stage
  SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL,

  // supabase image
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,

  // sendgrid email

  SENDGRID_EMAIL_API: process.env.SENDGRID_EMAIL_API,

  //   deployed frontend
  FRONTEND_URL: process.env.FRONTEND_URL,
};
