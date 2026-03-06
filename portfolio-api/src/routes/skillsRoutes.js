import express from "express";
import { skills } from "../controllers/skillsController.js";

const router = express.Router();

router.get("/skillsDetails", skills);

export default router;
