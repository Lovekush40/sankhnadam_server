// models/TourPackage.js
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

// Nested schema for itinerary items
const ItinerarySchema = new Schema(
  {
    day: { type: String, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
  },
  { _id: false } 
);

const TourPackageSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0, min: 0 },
    image: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    itinerary: { type: [ItinerarySchema], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    policies: { type: [String], default: [] },
    startDates: { type: [Date], default: [] },
    timing: { type: String, default: "" },
    groupSize: { type: String, default: "" },
  },
  { timestamps: true } // createdAt, updatedAt
);


export const TourPackage = mongoose.model("TourPackage", TourPackageSchema);
