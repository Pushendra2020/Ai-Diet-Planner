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

const dietPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalCalories: Number,
    meals: {
      type: [mealSchema],
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

export const dietPlan = mongoose.model("dietPlan", dietPlanSchema);
