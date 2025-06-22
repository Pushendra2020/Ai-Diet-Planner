import { dietPlan } from "../models/dietPlan.model.js";
import { User } from "../models/user.model.js";
import { Health } from "../models/health.model.js";
import axios from "axios"; 
import ApiResponse from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js"


const callGemini = async (prompt) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = response.data;
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};


const createDietPrompt = (user, health) => `
Create a personalized diet plan based on the following:
User: ${user.username}, Age: ${user.age}, Gender: ${user.gender}, Height: ${user.height}cm, Weight: ${user.weight}kg
Goal: ${user.goal}, Activity: ${user.activityLevel}, Preferences: ${user.dietPreferences}, BMI:${health.bmi}, Calorie Need:${health.calorieNeed}, BMR:${health.bmr}, TDEE:${health.tdee}

Return JSON format:
[
  {
    "mealType": "breakfast",
    "name": "Oats with banana",
    "ingredients": ["Oats - 50g", "Milk - 200ml", "Banana - 1"],
    "calories": 350,
    "macros": { "protein": 12, "carbs": 60, "fat": 8 }
  }
]
`;


const generateDietPlanAI = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if a diet plan already exists for this user
    const existingPlan = await dietPlan.findOne({ userId: user._id });
    if (existingPlan) {
      return res.status(200).json(new ApiResponse(200, { newPlan: existingPlan }, "Existing diet plan found"));
    }

    const health = await Health.findOne({ userId: user._id });
    if (!health) {
      throw new ApiError(501, "Health matrix data is not get.");
    }

    const prompt = createDietPrompt(user, health);
    const result = await callGemini(prompt);
    let parsedMeals;

    try {
      const match = result.match(/\[.*\]/s);
      if (!match) throw new Error("No JSON array found in AI response.");
      parsedMeals = JSON.parse(match[0]);
    } catch (e) {
      return res.status(500).json({
        error: "AI response could not be parsed.",
        details: e.message,
        raw: result,
      });
    }

    // Normalize mealType
    parsedMeals = parsedMeals.map((meal) => {
      if (
        meal.mealType &&
        !["breakfast", "lunch", "dinner", "snack"].includes(meal.mealType)
      ) {
        if (meal.mealType.toLowerCase().includes("snack")) {
          return { ...meal, mealType: "snack" };
        }
        return { ...meal, mealType: "snack" };
      }
      return meal;
    });

    const totalCalories = parsedMeals.reduce(
      (sum, m) => sum + (m.calories || 0),
      0
    );

    const newPlan = await dietPlan.create({
      userId: user._id,
      meals: parsedMeals,
      totalCalories,
      source: "ai",
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { newPlan }, "Generated new diet plan"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default generateDietPlanAI












