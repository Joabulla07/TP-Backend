import SibApiV3Sdk from 'sib-api-v3-sdk';
import { config } from "../core/config.js";

// Configuración del cliente
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.brevoApiKey;

// Crear instancia de la API de transacciones
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendToMeService = async (userData) => {
    const { userEmail, subject, content } = userData
    // Configurar el correo
    console.log(userData)
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
        name: 'GestionAR',
        email: 'joannabbado4748@gmail.com'
    };

    sendSmtpEmail.to = [{
        email: 'joannabbado4748@gmail.com',
        name: 'GestionAR'
    }];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.textContent = `Usuario: ${userEmail}\n\nMensaje: ${content}`;

    // Enviar el correo
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(data)

    return {message: 'Correo enviado correctamente', content: data}
}

//Todo: crear la notificacion al usuario por email