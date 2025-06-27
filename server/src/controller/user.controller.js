import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {Health} from "../models/health.model.js"
import jwt from "jsonwebtoken";
import { calculateAndSaveHealth } from "../utils/calculateAndSaveHealth.js";


const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Enable to genrate Token");
  }
};

const userRegister = asyncHandler(async (req, res) => {
  //First get a data from the frontend
  //check if the firld is empty or not
  // check the user is exist or not
  //find the bmi and other values by calculation
  //Store the data in the databse
  const {
    username,
    email,
    password,
    age,
    gender,
    height,
    weight,
    activityLevel,
    goal,
    dietPreferences,
    allergies,
    mealsPerDay,     
    mealBudgets
  } = req.body;

  if (
    [
      username,
      email,
      password,
      age,
      gender,
      height,
      weight,
      activityLevel,
      goal,
      dietPreferences,
      mealsPerDay,     
      mealBudgets
    ].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "All Fields are require");
  }

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExist) {
    throw new ApiError(401, "user is already exist");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    age,
    gender,
    goal,
    height,
    weight,
    activityLevel,
    dietPreferences,
    allergies,
    mealsPerDay,     
    mealBudgets
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(500, "Faield to store user to data base");
  }

  const healthData = await calculateAndSaveHealth({
    userId: user._id,
    age,
    gender,
    height,
    weight,
    activityLevel,
    goal,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userCreated, health: healthData },
        "User created Successfully"
      )
    );
});

const userLogin = asyncHandler(async (req, res) => {
  //First take emai,password from frontend
  //check the input fields are enter or not
  //Check the email,password to data base
  //if email is in database and password is wrong then tell the user password is wrong
  //if email is not present is DB then tell user that user is not exits
  //when use is validated then give a accept token to the user.
  const { email, password } = req.body;
  // const password  = req.body;
  if ([email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are require");
  }
  const user = await User.findOne({ email });
  console.log(user._id);
  console.log(user);
  if (!user) {
    throw new ApiError(400, "User is not Exist");
  }

  const isPasswordValide = await user.isPasswordCorrect(password);
  console.log(password);
  if (!isPasswordValide) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: accessToken,
          refreshToken,
          loggedInUser,
        },
        "User Is LoggedIn"
      )
    );
});

const userLogOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Is LogOut"));
});

const refereshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefereshToken = req.cookies.refereshToken;

  if (!incommingRefereshToken) {
    throw new ApiError(400, "Invalide Refresh Token");
  }

  try {
    const decoded = jwt.verify(
      incommingRefereshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    if (incommingRefereshToken !== user?.refereshToken) {
      throw new ApiError(401, "Referesh Token is expire or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const { accessToken, newRefereshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refereshToken", newRefereshToken, options)
      .json(
        new ApiResponse(200, {
          accessToken,
          refereshToken: newRefereshToken,
        })
      );
  } catch (error) {
    throw new ApiError(400, "Invalide Refresh Token", error);
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "The Entered password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password change successfuly"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User Data is fetched!!"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const {
    age,
    gender,
    height,
    weight,
    activityLevel,
    goal,
    dietPreferences,
    allergies,
    mealsPerDay,     
    mealBudgets
  } = req.body;

  // if (!fullname || !email) {
  //   throw new ApiError(400, "All fields are require");
  // }

  const user =await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        dietPreferences,
        allergies,
        mealsPerDay,     
        mealBudgets
      },
    },
    {
      new: true,
    }
  ).select("-password -_id");

  const healthData = await calculateAndSaveHealth({
    userId: user._id,
    age,
    gender,
    height,
    weight,
    activityLevel,
    goal,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: user, health: healthData },
        "Account Details are updated!!"
      )
    );
});

const getHealthUser = asyncHandler(async(req,res)=>{
  const userId=req.user?._id
  const healthUser=await Health.find({userId})

  return res.status(200).json(
    new ApiResponse(
      200,
      {healthUser},
      "Getting data of user Health"
    )
  )

})

export {
  userRegister,
  userLogin,
  userLogOut,
  refereshAccessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateAccountDetails,
  getHealthUser
};
