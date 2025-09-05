import User from "../models/userModel.js"
import {
    createUserService,
    getUserByIdService, resetPasswordService
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

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService({ userId: id });

        return res.status(200).json(user);
    } catch(error) {
        if(error.message === "Usuario no encontrado") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
}


export const resetPasswordForm = async(req, res) =>{
    const { id } = req.params;
    return res.render('CHANGE_PASSWORD_RESET', {
        user_id: id,
    });
}


export const resetPassword = async(req, res) => {
    try{
        const { id }  = req.params
        const { new_password } = req.body
        const result = await resetPasswordService(id, new_password)

        // Todo: enviar un mail notificando al usuario que se cambio la contraseña

        return res.render('PASSWORD_SUCCESSFULLY_CHANGE', {
            message: result
        });

    } catch(error){
        return res.status(500).json({
            error: 'Ocurrió un error al actualizar la contraseña'
        });
    }
}