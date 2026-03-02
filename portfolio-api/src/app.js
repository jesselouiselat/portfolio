import express from "express";
import cors from "cors";

import heroRoutes from "./routes/heroRoutes.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/portfolio/hero", heroRoutes);

app.get("/test", (req, res) => {
  console.log("Working!");
  res.send("Route is Working");
});

export default app;
