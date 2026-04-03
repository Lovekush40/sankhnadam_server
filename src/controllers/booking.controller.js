import { Booking } from "../models/booking.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getUserBookings = asyncHandler(async(req, res) => {
    const myBooking = await Booking.find({userId: req.user._id }).sort({createdAt: -1})

    console.log("My bookings", myBooking)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            myBooking,
            "User Booking Fetched Successfully"
        )
    )
})

export {getUserBookings}