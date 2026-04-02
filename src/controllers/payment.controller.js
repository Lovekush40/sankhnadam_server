import asyncHandler from "../utils/asyncHandler.js";
import { razorpay } from "../utils/razorpay.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import crypto from "crypto";

import { Booking } from "../models/booking.model.js";
import { TourPackage } from "../models/tourPackage.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const { packageId } = req.body;

  if (!packageId) {
    throw new ApiError(400, "packageId is required");
  }

  // 🔍 Fetch package
  const pkg = await TourPackage.findById(packageId);

  if (!pkg) {
    throw new ApiError(404, "Package not found");
  }

  // 🔐 Calculate amount (DO NOT trust frontend)
  const totalAmount = pkg.price;
  const advanceAmount = Math.round(totalAmount * 0.3);

  // 💳 Create Razorpay order
  const order = await razorpay.orders.create({
    amount: advanceAmount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });

  console.log("order", order);

  // 📦 Create booking
  const booking = await Booking.create({
    userId: req.user._id,
    packageId,

    totalAmount,
    paidAmount: 0,
    remainingAmount: totalAmount,

    razorpay_order_id: order.id,
    paymentStatus: "pending",
  });

  console.log(booking, "this is booking")

  return res.status(200).json(
    new ApiResponse(200, order, "order created successfully")
  );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const booking = await Booking.findOne({ razorpay_order_id });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (expectedSignature === razorpay_signature) {

    const advanceAmount = Math.round(booking.totalAmount * 0.3);

    booking.razorpay_payment_id = razorpay_payment_id;
    booking.razorpay_signature = razorpay_signature;

    booking.paidAmount = advanceAmount;
    booking.remainingAmount = booking.totalAmount - advanceAmount;
    booking.paymentStatus = "partial";

    await booking.save();

    return res.status(200).json(
      new ApiResponse(200, booking, "payment verified successfully")
    );

  } else {

    booking.paymentStatus = "failed";
    await booking.save();

    return res.status(400).json(
      new ApiResponse(400, null, "payment failed")
    );
  }
});

export {createOrder, verifyPayment}