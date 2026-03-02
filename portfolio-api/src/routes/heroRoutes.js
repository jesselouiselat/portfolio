import express from "express";

import { aboutMeDetails } from "../controllers/heroController.js";

const router = express.Router();

router.get("/aboutMeDetails", aboutMeDetails);

export default router;
