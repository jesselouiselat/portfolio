import { pool } from "../config/db.js";
import { supabase } from "../config/supabaseClient.js";

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    const projects = result.rows.map((project) => {
      const screenshotsWithUrls = project.screenshots.map((path) => {
        const { data } = supabase.storage.from("Projects").getPublicUrl(path);
        return data.publicUrl;
      });
      return { ...project, screenshots: screenshotsWithUrls };
    });
    console.log(projects);
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
