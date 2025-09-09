import {loginService} from "../services/loginService.js";
import logger from "../core/logger.js";



export const login = async (req, res) => {
    try {
        const userData = req.body
        logger.info("user Data: ", userData)
        const result = await loginService(userData)
        logger.info("Result: ", result)
        return res.status(200).json(result);
    } catch (err){
        return res.status(500).json({ message: "Error interno del servidor", err});
    }

}