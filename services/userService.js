import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const createUserService = async (userData) => {
    const { password, email } = userData
    userData.password = await bcrypt.hash(password, 12)
    const userExist = await User.findOne({email})

    if(userExist){
        throw new Error(`Usuario ${email} ya existe`)
    }

    await userData.save()
    return { message: "Usuario creado" }
}

export const getUserByIdService = async(userData) => {
    const { userId } = userData
    console.log(userId)
    const user = await User.findById(userId)

    if(!user){
        throw new Error("Usuario no encontrado")
    }

    return {
        userId: user._id,
        name: user.name,
        lastname: user.lastName,
        email: user.email
    }
}

//todo: forget password