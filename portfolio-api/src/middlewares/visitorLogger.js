import { pool } from "../config/db.js";

const visitorLogger = async (req, res, next) => {
  const path = req.path;

  try {
    await pool.query(
      `INSERT INTO page_views (path, views, last_accessed) VALUES ($1, 1, NOW()) ON CONFLICT (path)DO UPDATE SET views = page_views.views + 1, last_accessed = NOW()`,
      [path],
    );
  } catch (error) {
    console.error("Visitor logger error:", error);
  }

  next();
};

export default visitorLogger;
