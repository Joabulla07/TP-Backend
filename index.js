import express from 'express'
import bodyParser from "body-parser";
import {userRoute} from "./routers/userRouter.js";
import {connectDB} from "./core/db.js";
import {loginRoute} from "./routers/loginRouter.js";
import {emailRoute} from "./routers/emailRouter.js";
import session from 'express-session'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import logger from './core/logger.js';

const app = express()
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Conectar a la base de datos
connectDB();

// Middleware para logging de peticiones
app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.originalUrl}`);
    next();
});

// Add CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://gestionarreactapptp2.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos (CSS, JS, imágenes)
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret", // Usar variable de entorno
        resave: false,
        saveUninitialized: false,
    })
)

// Rutas
app.use("/api/user", userRoute)
app.use("/api", loginRoute)
app.use('/api/email', emailRoute);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
    // Respuesta al cliente
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Error interno del servidor',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

const server = app.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`);    
    logger.info(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

// Manejador de errores no capturados
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! ');
    logger.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    logger.info('');
    server.close(() => {
        logger.info('');
    });
});

export { app };