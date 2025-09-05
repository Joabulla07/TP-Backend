import dotenv from 'dotenv';
dotenv.config();

export const config = {
    mongoUri: process.env.MONGO_DB_CONNECTION_STRING,
    dbName: process.env.DB_NAME,
    dbCollection: process.env.DB_COLLECTION,
    brevoApiKey: process.env.BREVO_API_KEY,
    apiUrl: process.env.FRONTEND_URL
};