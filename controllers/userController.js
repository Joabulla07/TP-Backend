import User from "../models/userModel.js"
import bcrypt from "bcryptjs";


export const createUser = async (req, res) => {
    try {
        const userData = new User(req.body)

        const { email, password } = userData
        const userExist = await User.findOne({email})
        if(userExist){
            return res
                .status(400)
                .json({ message: `User with ${email} already exists` })
        }

        userData.password = await bcrypt.hash(password, 12)

        await userData.save()
        res.status(200).json({ message: "User created" })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error })
    }
}

export const changePassword = async (req, res) => {
    try {
        const userData = req.body
        const { userId, password } = userData

        if (!password) {
            return res.status(400).json({ message: "New password is required" });
        }

        const newPassword = await bcrypt.hash(password, 12)

        const updatedUser  = await User.findByIdAndUpdate(
            userId,
            {password: newPassword},
            {new: true, runValidators: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Password updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating password",
            error: error.message
        });
    }
}