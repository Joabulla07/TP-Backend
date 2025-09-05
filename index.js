import express from 'express'
import bodyParser from "body-parser";
import {userRoute} from "./routers/userRouter.js";
import {connectDB} from "./core/db.js";
import {loginRoute} from "./routers/loginRouter.js";
import {emailRoute} from "./routers/emailRouter.js";
import session from 'express-session'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de tener una carpeta 'views' en tu proyecto

// Middleware para archivos estáticos (CSS, JS, imágenes)
app.use(express.static('public'));


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: "secret", // Dato unico de nuestro sistema
        resave: false, // Evita que la sesion se vuelva a guardar si no hay datos
        saveUninitialized: false, // Evita que se guarde una sesion no inicializada
    })
)

app.use("/api/user", userRoute)
app.use("/api/", loginRoute)
app.use('/api/email', emailRoute);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})