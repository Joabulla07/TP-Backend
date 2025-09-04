import User from "../models/userModel.js"
import bcrypt from "bcryptjs";



export const login = async (req, res) => {
    try {
        const userData = req.body

        const { email, password } = userData

        const user = await User.findOne({email})

        if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

        const ok = bcrypt.compareSync(password, user.password);

        if (!ok) return res.status(400).json({ message: "Credenciales inválidas" });

        return res.status(200).json({ message: "Login correcto"});
    } catch (err){
        return res.status(500).json({ message: "Error interno del servidor", err});
    }


}