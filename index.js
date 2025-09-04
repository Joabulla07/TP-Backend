import express from 'express'
import bodyParser from "body-parser";
import {userRoute} from "./routers/userRouter.js";
import {connectDB} from "./core/db.js";
import {loginRoute} from "./routers/loginRouter.js";
import {emailRoute} from "./routers/emailRouter.js";

const app = express()
const PORT = 3000

connectDB();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/user", userRoute)
app.use("/api/", loginRoute)
app.use('/api/email', emailRoute);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})