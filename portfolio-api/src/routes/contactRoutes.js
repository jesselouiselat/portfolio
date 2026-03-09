import { sendEmail } from "../controllers/contactController.js";
import express from "express";

const router = express.Router();

router.post("/sendEmail", sendEmail);

export default router;
