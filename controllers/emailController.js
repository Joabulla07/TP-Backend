// controllers/emailController.js
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { config } from "../core/config.js";

// Configuración del cliente
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.brevoApiKey;

// Crear instancia de la API de transacciones
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendToMe = async (req, res) => {
    try {
        const { userEmail, subject, content } = req.body;

        // Configurar el correo
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

        res.status(200).json({
            success: true,
            message: 'Correo enviado correctamente',
            data
        });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar el correo',
            error: error.message || error.response?.body?.message || 'Error desconocido'
        });
    }
};