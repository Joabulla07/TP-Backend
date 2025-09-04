import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import {
    changePasswordService,
    createUserService,
    getUserByEmailService,
    getUserByIdService
} from "../services/userService.js";


export const createUser = async (req, res) => {
    try {
        const userData = new User(req.body)
        const result = await createUserService(userData)
        return res.status(201).json(result)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}
//Todo: crear forgot password

// export const changePassword = async (req, res) => {
//     try {
//         const userData = req.body
//         const result = await changePasswordService(userData)
//
//         return res.status(200).json({
//            result
//         });
//
//     } catch (error) {
//         res.status(500).json({
//             message: "Error updating password",
//             error: error.message
//         });
//     }
// }

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService({ userId: id });

        return res.status(200).json(user);
    } catch(error) {
        console.error('Error en getUserById:', error);
        if(error.message === "User not found") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
}