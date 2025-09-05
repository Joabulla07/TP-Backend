import {forgetPasswordEmailService, sendToMeService} from "../services/emailService.js";


export const sendToMe = async (req, res) => {
    try {
        const userData = req.body;
        const result = await sendToMeService(userData)

        return  res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al enviar el correo',
            error: error.message || error.response?.body?.message || 'Error desconocido'
        });
    }
};


export const forgetPasswordEmailSend = async(req, res) => {
    try{
        const { email } = req.body
        const result = await forgetPasswordEmailService(email)

        return res.status(200).json(result)
    } catch(error){
        if(error.message === "Usuario no encontrado"){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
}