import express from 'express'
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { verifyJWT } from '../middlewares/auth.js';

const router = express.Router();

router.route('/create-order').post(verifyJWT, createOrder);
router.route('/verify-payment').post(verifyPayment);

export default router;