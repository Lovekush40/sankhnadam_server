import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { createMessage } from "../controllers/message.controller.js";

const router = Router();

router.route('/send-message').post(verifyJWT, createMessage)

export default router