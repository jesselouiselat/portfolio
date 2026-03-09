import { pool } from "../config/db.js";
import { mapStorageUrls } from "../utils/mapStorageUrls.js";

export const aboutMeDetails = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM about_me");
    const details = result.rows.map((detail) => ({
      ...detail,
      additional_details: {
        ...detail.additional_details,
        resume: mapStorageUrls("Resume", detail.additional_details.resume),
      },
    }));

    return res.status(200).json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
