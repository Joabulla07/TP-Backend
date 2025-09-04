import express from 'express';
import { sendToMe } from '../controllers/emailController.js';

export const emailRoute = express.Router();

emailRoute.post('/send-to-me', sendToMe);
