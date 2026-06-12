import mongoose, { Schema } from "mongoose";

const mealSchema = new Schema({
  mealType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },

  quantity: { 
    type: String ,
  required: true,
  },
 
  
  calories: Number,
  estimatedCost: Number,
  macros: {
    protein: {
      type: Number,
      require: true,
    },
    carbs: {
      type: Number,
      require: true,
    },
    fat: {
      type: Number,
      require: true,
    },
  },
});

const daySchema = new Schema({
  dayNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },
  label: {
    type: String,
    required: true,
  },
  totalCalories: Number,
  meals: {
    type: [mealSchema],
    default: [],
  },
});

const dietPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalCalories: Number,
    averageDailyCalories: Number,
    currency: {
      type: String,
      default: "INR",
    },
    days: {
      type: [daySchema],
      default: [],
    },
    // Kept for compatibility with plans generated before weekly plans.
    meals: {
      type: [mealSchema],
      default: [],
    },
    source: {
      type: String,
      enum: ["api", "ai", "custom"],
      default: "ai",
    },
    notes: String,
  },
  { timestamps: true }
);

 const dietPlan = mongoose.model("dietPlan", dietPlanSchema);
export default dietPlan;
