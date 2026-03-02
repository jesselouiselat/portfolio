import { pool } from "../config/db.js";

export const aboutMeDetails = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM about_me");
    const details = result.rows;
    console.log(details);

    return res.status(200).json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
