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

if (ENV.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      const isLocal = !origin;
      const isWhiteListed = allowedOrigins.includes(origin);

      if (isLocal || isWhiteListed) return callback(null, true);
      return callback(new Error("Origin not allowed."), false);
    },
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
