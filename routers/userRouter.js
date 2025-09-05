import express from 'express'
import {createUser, getUserById, resetPassword, resetPasswordForm} from "../controllers/userController.js";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
userRoute.get("/getUser/:id", getUserById)
userRoute.post("/resetPassword/:id", resetPassword)
userRoute.get("/resetPasswordForm/:id", resetPasswordForm)