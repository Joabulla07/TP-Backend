import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir niveles de log
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Nivel de log según el entorno
const level = () => {
    // Forzar el nivel de log a 'debug' para ver todos los mensajes
    // En producción, puedes cambiarlo a 'info' o usar la variable de entorno
    return process.env.LOG_LEVEL?.toLowerCase() || 'debug';
};

// Colores para la consola
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// Formato para la consola
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    )
);

// Formato para archivos (sin colores)
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
    )
);

// Crear directorio de logs si no existe
import fs from 'fs';
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Configuración de transportes
const transports = [
    // Consola - siempre activa
    new winston.transports.Console({
        format: consoleFormat,
        level: 'debug', // Mostrar todos los niveles en consola
    }),

    // Archivo de errores
    new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),

    // Archivo para todos los logs
    new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
];

// Crear el logger
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
    // Manejar excepciones no capturadas
    handleExceptions: true,
    handleRejections: true,
});

// Loggear excepciones no manejadas
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown:', error);
    process.exit(1);
});

export default logger;