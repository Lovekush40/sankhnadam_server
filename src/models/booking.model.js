import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "TourPackage",
      required: true,
    },

    packageName: {
      type: String,
      required: true,
    },

    packageImage: {
      type: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "failed"],
      default: "pending",
    },

    // 📅 Booking Info
    travelDate: {
      type: Date,
    },

    persons: {
      type: Number,
      default: 1,
    },

    // 🔗 Reference to latest payment/order
   razorpay_order_id: {
    type: String,
  },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);