import { pool } from "../config/db.js";
import { supabase } from "../config/supabaseClient.js";
import { mapStorageUrls } from "../utils/mapStorageUrls.js";

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    const projects = result.rows.map((project) => ({
      ...project,
      screenshots: mapStorageUrls("Projects", project.screenshots),
    }));

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
