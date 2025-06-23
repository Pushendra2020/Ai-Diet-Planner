import express from "express";
import generateDietPlanAI, { askDietAI, changeDietPlanAI } from "../controller/genrate.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate diet plan (AI)
router.get("/generate", verifyJWT, generateDietPlanAI);

// AI chat endpoint
router.post("/ask-ai", verifyJWT, askDietAI);

// Change diet plan
router.post("/change-plan", verifyJWT, changeDietPlanAI);

export default router; 