import express from 'express';
import {forgetPasswordEmailSend, sendToMe} from '../controllers/emailController.js';

export const emailRoute = express.Router();

emailRoute.post('/send-to-me', sendToMe);
emailRoute.post('/forgetPassword', forgetPasswordEmailSend)
