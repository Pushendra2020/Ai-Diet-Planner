import mongoose, { Schema } from "mongoose";

const healthSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bmi: Number,
    bmr: Number,
    tdee: Number,
    bodyFatPercentage: Number,
    calorieNeed: Number,
  },
  { timestamps: true }
);

export const Health = mongoose.model("Health", healthSchema);
