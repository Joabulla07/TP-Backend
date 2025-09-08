import SibApiV3Sdk from 'sib-api-v3-sdk';
import { config } from "../core/config.js";
import User from "../models/userModel.js";
import {loadEmailTemplate} from "../utils/emailHelper.js";
import logger from "../core/logger.js";


const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.brevoApiKey;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendToMeService = async (userData) => {
    const { name, email, telefono, consultas, message } = userData

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    logger.info("ingresando a sendToMeService")
    logger.info("payload: ", userData)

    sendSmtpEmail.sender = {
        name: 'GestionAR',
        email: 'joannabbado4748@gmail.com'
    };

    sendSmtpEmail.to = [{
        email: 'joannabbado4748@gmail.com',
        name: 'GestionAR'
    }];

    sendSmtpEmail.subject = "Formulario de Contacto";
    sendSmtpEmail.textContent = `Usuario Email: ${email}\n\nNombre: ${name}\n\nTelefono: ${telefono}\n\nConsultas: ${consultas}\n\nMensaje: ${message}`;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    logger.info(data)

    return {message: 'Correo enviado correctamente', content: data}
}

export const forgetPasswordEmailService = async(email) => {
    console.log(email)
    const user = await User.findOne({email});
    console.log(user)
    if(!user){
        throw new Error("Usuario no encontrado");
    }

    const resetUrl = `${process.env.FRONTEND_URL}/api/users/reset-password/${user._id}`;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    const template = await loadEmailTemplate('FORGOT_PASSWORD_RESET_EMAIL', {
        link: resetUrl,
    });

    sendSmtpEmail.sender = {
        name: 'GestionAR',
        email: 'joannabbado4748@gmail.com'
    };

    sendSmtpEmail.to = [{
        email: email
    }];

    sendSmtpEmail.subject = "Restablecer contraseña";
    sendSmtpEmail.htmlContent = template;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        return { success: true, message: 'Correo de restablecimiento enviado' };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo de restablecimiento');
    }
}

//Todo: crear la notificacion al usuario por email del formulario
// Todo: crear notificacion de cambio de contraseña