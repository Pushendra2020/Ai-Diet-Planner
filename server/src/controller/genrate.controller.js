import dietPlan from "../models/dietPlan.model.js";
import { User } from "../models/user.model.js";
import { Health } from "../models/health.model.js";
import axios from "axios";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"


const callAI = async (prompt) => {
  const apiKey = process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY;
  const baseUrl = (process.env.OPENAI_BASE_URL || "https://integrate.api.nvidia.com/v1")
    .replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL;

  if (!apiKey) {
    throw new ApiError(500, "OPENAI_API_KEY or NVIDIA_API_KEY is not configured.");
  }

  if (!model) {
    throw new ApiError(500, "OPENAI_MODEL is not configured.");
  }

  try {
    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: Number(process.env.OPENAI_MAX_TOKENS) || 8192,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("The AI provider returned an empty response.");
    }

    return content;
  } catch (error) {
    const providerMessage = error.response?.data?.error?.message;
    throw new ApiError(
      error.response?.status || 500,
      providerMessage || error.message || "AI provider request failed."
    );
  }
};

const createDietPrompt = (user, health) => {
  const mealCount = user.mealsPerDay || 3;
  const budgets = user.mealBudgets && user.mealBudgets.length === mealCount
    ? user.mealBudgets.join(', ')
    : 'not specified';

  return `
Create a personalized 7-day diet plan for the following user:
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
- Return exactly 7 days, numbered 1 through 7.
- Give every day ${mealCount} meals and vary the dishes across the week.
- Keep each day's total close to ${health.calorieNeed} calories.
- Distribute each day's calories across ${mealCount} meals.
- For each meal, provide only:
  - The dish name (e.g., \"Paneer Curry\")
  - The quantity (e.g., \"2 chapati + 1 bowl curry\")
  - The total calories for the meal
  - Macros (protein, carbs, fat)
  - Estimated cost (optional)
- Do NOT include an ingredients list.
- Name meals as \"Meal 1\", \"Meal 2\", etc.
- Return only a valid JSON array with no markdown or commentary.
- Use this exact structure:
[
  {
    \"dayNumber\": 1,
    \"label\": \"Day 1\",
    \"meals\": [
      {
        \"mealType\": \"Meal 1\",
        \"name\": \"Paneer Curry\",
        \"quantity\": \"2 chapati + 1 bowl curry\",
        \"calories\": 350,
        \"macros\": { \"protein\": 12, \"carbs\": 60, \"fat\": 8 },
        \"estimatedCost\": 50
      }
    ]
  }
]
`;
};

const parseJsonArray = (value) => {
  const match = value.match(/\[.*\]/s);
  if (!match) throw new Error("No JSON array found in AI response.");
  return JSON.parse(match[0]);
};

const normalizeDays = (days) => {
  if (!Array.isArray(days) || days.length !== 7) {
    throw new Error("AI response must contain exactly 7 days.");
  }

  return days.map((day, dayIndex) => {
    if (!Array.isArray(day.meals) || day.meals.length === 0) {
      throw new Error(`Day ${dayIndex + 1} does not contain any meals.`);
    }

    const meals = day.meals.map((meal, mealIndex) => ({
      ...meal,
      mealType: `Meal ${mealIndex + 1}`,
    }));

    return {
      dayNumber: dayIndex + 1,
      label: `Day ${dayIndex + 1}`,
      meals,
      totalCalories: meals.reduce((sum, meal) => sum + (Number(meal.calories) || 0), 0),
    };
  });
};

const getWeeklyTotals = (days) => {
  const totalCalories = days.reduce((sum, day) => sum + day.totalCalories, 0);
  return {
    totalCalories,
    averageDailyCalories: Math.round(totalCalories / days.length),
  };
};

const generateDietPlanAI = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if a diet plan already exists for this user
    const existingPlan = await dietPlan.findOne({ userId: user._id });
    if (existingPlan?.days?.length === 7) {
      return res.status(200).json(new ApiResponse(200, { newPlan: existingPlan }, "Existing diet plan found"));
    }

    const health = await Health.findOne({ userId: user._id });
    if (!health) {
      throw new ApiError(501, "Health matrix data is not get.");
    }

    const prompt = createDietPrompt(user, health);
    const result = await callAI(prompt);
    let days;

    try {
      days = normalizeDays(parseJsonArray(result));
    } catch (e) {
      return res.status(500).json({
        error: "AI response could not be parsed.",
        details: e.message,
        raw: result,
      });
    }

    const planData = {
      userId: user._id,
      days,
      meals: [],
      currency: user.currency || "INR",
      ...getWeeklyTotals(days),
      source: "ai",
    };
    const newPlan = existingPlan
      ? await dietPlan.findByIdAndUpdate(existingPlan._id, { $set: planData }, { new: true })
      : await dietPlan.create(planData);
    return res
      .status(200)
      .json(new ApiResponse(200, { newPlan }, "Generated new diet plan"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// AI chat endpoint for diet Q&A
export const askDietAI = async (req, res) => {
  try {
    const { question, user, dietPlane, healthInfo } = req.body;
    if (!question || !user || !dietPlane || !healthInfo) {
      return res.status(400).json({ error: 'Missing required data.' });
    }
    // Build prompt
    const prompt = `You are a helpful AI diet assistant.\n\nUser Info:\nName: ${user.username}\nAge: ${user.age}\nGender: ${user.gender}\nHeight: ${user.height}cm\n
    Weight: ${user.weight}kg\nGoal: ${user.goal}\nActivity Level: ${user.activityLevel}\nDietary Preferences: ${user.dietPreferences}\nAllergies: ${user.allergies?.join(', ') || 'None'}
    \nMeals Per Day: ${user.mealsPerDay}\nMeal Budgets: ${(user.mealBudgets || []).join(', ')}\nCurrency: ${user.currency || 'INR'}\n\nHealth Info:\nBMI: ${healthInfo.bmi}\nBMR: ${healthInfo.bmr}\nTDEE: ${healthInfo.tdee}
    \nCalorie Need: ${healthInfo.calorieNeed}\n\n7-Day Diet Plan:\n${JSON.stringify(dietPlane.days || [], null, 2)}\n\nUser Question: ${question}\n\nAnswer the user in a friendly, helpful, and concise way.`;
    const aiAnswer = await callAI(prompt);
    return res.json({ answer: aiAnswer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const changeDietPlanAI = async (req, res) => {
  try {
    const { changeRequest, user, dietPlane, healthInfo } = req.body;
    if (!changeRequest || !user || !dietPlane || !healthInfo) {
      return res.status(400).json({ error: 'Missing required data.' });
    }
    // Build prompt for the configured AI provider
    const prompt = `You are an expert AI dietitian. Update the user's 7-day diet plan based on their request.\n\nUser Info:\nName: ${user.username}\nAge: ${user.age}\nGender: ${user.gender}\nHeight: ${user.height}cm\nWeight: ${user.weight}kg\nGoal: ${user.goal}\nActivity Level: ${user.activityLevel}\nDietary Preferences: ${user.dietPreferences}\nAllergies: ${user.allergies?.join(', ') || 'None'}\nMeals Per Day: ${user.mealsPerDay}\nMeal Budgets: ${(user.mealBudgets || []).join(', ')}\nCurrency: ${user.currency || 'INR'}\n\nHealth Info:\nBMI: ${healthInfo.bmi}\nBMR: ${healthInfo.bmr}\nTDEE: ${healthInfo.tdee}\nCalorie Need: ${healthInfo.calorieNeed}\n\nCurrent 7-Day Diet Plan:\n${JSON.stringify(dietPlane.days || [], null, 2)}\n\nUser Request: ${changeRequest}\n\n**Instructions:**\n- Only make the requested change.\n- Preserve all 7 days and all unaffected meals.\n- Return exactly 7 days using the same day and meal JSON structure.\n- Return only the JSON array with no markdown or commentary.`;
    const aiResult = await callAI(prompt);
    console.log('AI raw response:', aiResult);
    console.log('user._id:', user._id);
    console.log('dietPlane:', dietPlane);
    let updatedDays;
    try {
      updatedDays = normalizeDays(parseJsonArray(aiResult));
    } catch (e) {
      console.error('AI response parse error:', e, aiResult);
      return res.status(500).json({ error: 'AI response could not be parsed.', details: e.message, raw: aiResult });
    }
    const totals = getWeeklyTotals(updatedDays);
    // Update the plan in DB
    let updatedPlan;

    try {
      updatedPlan = await dietPlan.findOneAndUpdate(
         {userId:user._id},
        {
          $set: {
            days: updatedDays,
            meals: [],
            currency: user.currency || "INR",
            ...totals,
            source: 'ai'
          }
        },
        { new: true }
      );
    } catch (dbErr) {
      console.error('DB update error:', dbErr);
      return res.status(500).json({ error: 'Database update failed.', details: dbErr.message });
    }
    if (!updatedPlan) {
      console.error('Diet plan not found for user:', user._id);
      return res.status(404).json({ error: 'Diet plan not found.' });
    }
    return res.json({ updatedPlan });
  } catch (err) {
    console.error('changeDietPlanAI error:', err);
    res.status(500).json({ error: err.message, details: err });
  }
};

export default generateDietPlanAI












