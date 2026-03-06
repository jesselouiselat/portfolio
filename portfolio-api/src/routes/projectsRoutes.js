import express from "express";
import { getProjects } from "../controllers/projectsController.js";

const route = express.Router();

route.get("/getProjects", getProjects);

export default route;
