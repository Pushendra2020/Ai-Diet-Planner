import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: [true, "Password is require"],
    },
    age: {
      type: Number,
      require: true,
    },
    gender: {
      type: String,
      require: true,
      enum: ["Male", "Female"],
    },
    mealsPerDay: {
      type: Number,
      default: 3, // or whatever default you want
      min: 1,
      max: 10
    },

    currency: {
      type: String,
      enum: ['INR', 'USD'],
      default: 'INR'
    },
    
    mealBudgets: {
      type: [Number], // e.g. [100, 200, 300] for each meal
      default: []
    },
    height: {//in CM
      type: Number,
      require: true,
    },
    weight: {// Kg
      type: Number,
      require: true,
    },
    activityLevel: {
      type: String,
      require: true,
      enum: ["sedentary", "light", "moderate", "active", "very active"],
    },
    goal: {
      type: String,
      require: true,
      enum: ["lose", "maintain", "gain"],
    },
    dietPreferences: {
      type: String,
      require: true,
      enum: ["Vegetarian", "Non-vegetarian", "Vegon"],
    },
    
    allergies: [String],

    refreshToken:{
      type:String
    }
  },
 { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
