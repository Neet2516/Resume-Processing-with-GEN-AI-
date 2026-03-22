const express  = require('express') ; 
const authcontroller  = require("../controllers/authcontroller")
const authRouter  = express.Router() ;
const authMiddleware = require("../middlewares/auth.middleware")
/**
 * @route POST/api/auth/register
 * @description Registeration a new user
 * @access Public
 */
authRouter.post("/register",authcontroller.registerUserController)
/**
 * @route POST/api/auth/login
 * @description  Login user with email and password
 * @access Public
 */
authRouter.post("/login",authcontroller.loginUserController)
/**
 * @route GET/api/auth/logout
 * @description  Clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout",authcontroller.logoutUserController)

/**
 * @route GET/api/auth/get-me
 * @description get the current logged in user details
 * @access Public
 */
authRouter.get("/get-me",authMiddleware.authUser , authcontroller.getMeController)

module.exports   = authRouter ;