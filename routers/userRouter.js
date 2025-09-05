import express from 'express'
import {createUser, getUserById} from "../controllers/userController.js";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
//userRoute.put('/changePassword', changePassword);
userRoute.get("/getUser/:id", getUserById)