import { pool } from "../config/db.js";

export const skills = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM skill");

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
