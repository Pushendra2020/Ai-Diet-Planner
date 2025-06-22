import { dietPlan } from "../models/dietPlan.model.js";
import { User } from "../models/user.model.js";
import { Health } from "../models/health.model.js";
import axios from "axios";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"


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

const createDietPrompt = (user, health) => {
  const mealCount = user.mealsPerDay || 3;
  const budgets = user.mealBudgets && user.mealBudgets.length === mealCount
    ? user.mealBudgets.join(', ')
    : 'not specified';

  return `
Create a personalized diet plan for the following user:
- Name: ${user.username}
- Age: ${user.age}
- Gender: ${user.gender}
- Height: ${user.height}cm
- Weight: ${user.weight}kg
- Goal: ${user.goal}
- Activity Level: ${user.activityLevel}
- Preferences: ${user.dietPreferences}
- BMI: ${health.bmi}
- Calorie Need: ${health.calorieNeed}
- Meals per day: ${mealCount}
- Money budget for each meal (in ${user.currency}): ${budgets}

**Instructions:**
- Distribute the total daily calories across ${mealCount} meals.
- For each meal, provide only:
  - The dish name (e.g., \"Paneer Curry\")
  - The quantity (e.g., \"2 chapati + 1 bowl curry\")
  - The total calories for the meal
  - Macros (protein, carbs, fat)
  - Estimated cost (optional)
- Do NOT include an ingredients list.
- Name the meals as \"Meal 1\", \"Meal 2\", etc.
- Return the result in this JSON format:
[
  {
    \"mealType\": \"Meal 1\",
    \"name\": \"Paneer Curry\",
    \"quantity\": \"2 chapati + 1 bowl curry\",
    \"calories\": 350,
    \"macros\": { \"protein\": 12, \"carbs\": 60, \"fat\": 8 },
    \"estimatedCost\": 50
  }
]
`;
};

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

    // Rename all mealTypes to 'Meal 1', 'Meal 2', etc.
    parsedMeals = parsedMeals.map((meal, idx) => ({
      ...meal,
      mealType: `Meal ${idx + 1}`
    }));

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












