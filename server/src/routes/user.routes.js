import { Router } from "express";
import { changeCurrentPassword, getHealthUser, refereshAccessToken, updateAccountDetails, userLogin, userLogOut, userRegister } from "../controller/user.controller.js";
//import { calculation } from "../middleware/healthCalculate.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

//Secure Routs
router.route("/logout").post(verifyJWT,userLogOut)
router.route("/refresh-token").post(refereshAccessToken)
router.route("/updateUser").post(verifyJWT,updateAccountDetails)
router.route("/changepassword").post(verifyJWT,changeCurrentPassword)
router.route("/userHealth").get(verifyJWT,getHealthUser)

export default router;