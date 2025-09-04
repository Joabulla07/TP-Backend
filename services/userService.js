import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const createUserService = async (userData) => {
    const { password, email } = userData
    userData.password = await bcrypt.hash(password, 12)
    const userExist = await User.findOne({email})

    if(userExist){
        throw new Error(`User with ${email} already exists`)
    }

    await userData.save()
    return { message: "User created" }
}

export const getUserByIdService = async(userData) => {
    const { userId } = userData
    console.log(userId)
    const user = await User.findById(userId)

    if(!user){
        throw new Error("Not user found")
    }

    return {
        userId: user._id,
        name: user.name,
        lastname: user.lastName,
        email: user.email
    }
}

// export const changePasswordService = async (userData) => {
//     const { userId, password } = userData
//
//     if (!password) {
//         throw new Error("New password is required");
//     }
//
//     const newPassword = await bcrypt.hash(password, 12)
//
//     const updatedUser  = await User.findByIdAndUpdate(
//         userId,
//         {password: newPassword},
//         {new: true, runValidators: true}
//     )
//
//     if (!updatedUser) {
//         throw new Error("User not found");
//     }
//
//     return {message: "Password updated successfully"}
// }
