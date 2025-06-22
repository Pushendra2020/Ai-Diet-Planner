import express from "express";
import generateDietPlanAI from "../controller/genrate.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate diet plan (AI)
router.get("/generate", verifyJWT, generateDietPlanAI);

export default router; 