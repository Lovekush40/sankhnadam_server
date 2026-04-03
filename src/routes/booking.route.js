import express from 'express'
import { getUserBookings } from '../controllers/booking.controller.js';
import { verifyJWT } from '../middlewares/auth';

const router = express.Router();

router.route('/my-bookings').get(verifyJWT, getUserBookings)

export default router