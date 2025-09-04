import express from 'express'
import {changePassword, createUser} from "../controllers/userController.js";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
userRoute.put('/changePassword', changePassword);
