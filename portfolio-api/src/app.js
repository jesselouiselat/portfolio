import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";

import heroRoutes from "./routes/heroRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import projectRoutes from "./routes/projectsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import visitorLogger from "./middlewares/visitorLogger.js";

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", ENV.FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(visitorLogger);

app.use("/portfolio/hero", heroRoutes);
app.use("/portfolio/skills", skillsRoutes);
app.use("/portfolio/projects", projectRoutes);
app.use("/portfolio/contact", contactRoutes);

app.get("/test", (req, res) => {
  console.log("Working!");
  res.send("Route is Working");
});

export default app;
