import dietPlan from "../models/dietPlan.model.js";
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
    \nCalorie Need: ${healthInfo.calorieNeed}\n\nDiet Plan:\nTotal Calories: ${dietPlane.totalCalories}\nMeals: ${dietPlane.meals.map((m, i) => `Meal ${i + 1}: ${m.name} (${m.quantity || 'N/A'}, ${m.calories} kcal, Protein: ${m.macros?.protein}g, Carbs: ${m.macros?.carbs}g, Fat: ${m.macros?.fat}g)`).join('\n')}\n\nUser Question: ${question}\n\nAnswer the user in a friendly, helpful, and concise way.`;
    const aiAnswer = await callGemini(prompt);
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
    // Build prompt for Gemini
    const prompt = `You are an expert AI dietitian. Here is the user's current diet plan and their request to change it. 
    Please return the updated plan in the same JSON format as before.\n\nUser Info:\nName: ${user.username}\nAge: ${user.age}\nGender: ${user.gender}\nHeight: ${user.height}cm\nWeight: ${user.weight}kg\nGoal: ${user.goal}\nActivity Level: ${user.activityLevel}\nDietary Preferences: ${user.dietPreferences}\nAllergies: ${user.allergies?.join(', ') || 'None'}\nMeals Per Day: ${user.mealsPerDay}\nMeal Budgets: ${(user.mealBudgets || []).join(', ')}\nCurrency: ${user.currency || 'INR'}\n\nHealth Info:\nBMI: ${healthInfo.bmi}\nBMR: ${healthInfo.bmr}\nTDEE: ${healthInfo.tdee}\nCalorie Need: ${healthInfo.calorieNeed}\n\nCurrent Diet Plan:\nTotal Calories: ${dietPlane.totalCalories}\nMeals: ${JSON.stringify(dietPlane.meals, null, 2)}\n\nUser Request: ${changeRequest}\n\n**Instructions:**\n- Only make the requested change.\n- Return the full updated plan as a JSON array of meals, same format as before. ONLY return the JSON array, nothing else.`;
    const aiResult = await callGemini(prompt);
    console.log('AI raw response:', aiResult);
    console.log('user._id:', user._id);
    console.log('dietPlane:', dietPlane);
    let updatedMeals;
    try {
      const match = aiResult.match(/\[.*\]/s);
      if (!match) throw new Error('No JSON array found in AI response.');
      updatedMeals = JSON.parse(match[0]);
    } catch (e) {
      console.error('AI response parse error:', e, aiResult);
      return res.status(500).json({ error: 'AI response could not be parsed.', details: e.message, raw: aiResult });
    }
    // Rename all mealTypes to 'Meal 1', 'Meal 2', etc.
    updatedMeals = updatedMeals.map((meal, idx) => ({ ...meal, mealType: `Meal ${idx + 1}` }));
    const totalCalories = updatedMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    // Update the plan in DB
    let updatedPlan;

    try {
      updatedPlan = await dietPlan.findOneAndUpdate(
         {userId:user._id},
        {
          $set: {
            meals: updatedMeals,
            totalCalories,
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












