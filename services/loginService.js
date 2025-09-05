import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const loginService = async (userData) => {
    if(!userData){
        throw new Error("Error en los datos ingresados")
    }

    const { email, password } = userData
    const user = await User.findOne({email})

    if (!user) throw new Error("Credenciales inválidas")

    const ok = bcrypt.compareSync(password, user.password);

    if (!ok) throw new Error("Credenciales inválidas")

    return {message: "Login correcto", content: {userId: user._id, name: user.name, lastName: user.lastName}}
}