import express, {urlencoded} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import passport from "passport";
import "./config/passport.js"

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())
app.use(urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(passport.initialize());

import authRouter from './routes/googleAuth.route.js'
import tourPackageRouter from './routes/tourPackage.route.js'
import messageRouter from './routes/message.route.js'
import paymentRouter from './routes/payment.routes.js'
import bookingRouter from './routes/booking.route.js'


app.use('/api/v1', authRouter)
app.use('/api/v1/packages', tourPackageRouter)
app.use('/api/v1/contact', messageRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/bookings', bookingRouter)

export {app}