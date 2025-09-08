import winston from 'winston';

// Niveles de log
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Nivel de log según el entorno
const level = () => {
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
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    )
);

// Crear el logger solo con consola
const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;