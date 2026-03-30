// controllers/tourPackageController.js
import { TourPackage } from "../models/tourPackage.model.js";

// Helper: validate package data
function validatePackage(data) {
  const errors = [];

  if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
    errors.push("Title is required and must be a non-empty string.");
  }
  if (!data.location || typeof data.location !== "string" || !data.location.trim()) {
    errors.push("Location is required and must be a non-empty string.");
  }
  if (!data.duration || typeof data.duration !== "string") {
    errors.push("Duration is required and must be a string.");
  }
  if (typeof data.price !== "number" || data.price < 0) {
    errors.push("Price must be a number greater than or equal to 0.");
  }
  if (typeof data.originalPrice !== "number" || data.originalPrice < 0) {
    errors.push("Original price must be a number greater than or equal to 0.");
  }
  if (!Array.isArray(data.startDates)) {
    errors.push("Start dates must be an array.");
  } else {
    data.startDates.forEach((d) => {
      if (isNaN(Date.parse(d))) errors.push(`Invalid start date: ${d}`);
    });
  }
  if (!Array.isArray(data.itinerary)) {
    errors.push("Itinerary must be an array.");
  } else {
    data.itinerary.forEach((item, index) => {
      if (!item.day || !item.title || !item.details) {
        errors.push(`Itinerary item at index ${index} is missing required fields.`);
      }
    });
  }

  return errors;
}

// GET all packages
const getPackages = async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

// GET single package by ID
const getPackageById = async (req, res) => {
  try {
    const pkg = await TourPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.status(200).json(pkg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch package" });
  }
};

// CREATE new package
const createPackage = async (req, res) => {
  const errors = validatePackage(req.body);
  if (errors.length) {
    console.log("Validation errors:", errors); // log on server
    return res.status(400).json({ errors });
  }

  try {
    const newPackage = new TourPackage(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    console.error("Error creating package:", err);
    res.status(500).json({ error: "Failed to create package" });
  }
};

// UPDATE package
const updatePackage = async (req, res) => {
  const errors = validatePackage(req.body);
  if (errors.length) {
    console.log("Validation errors:", errors); // log on server
    return res.status(400).json({ errors });
  }

  try {
    const updatedPackage = await TourPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPackage) return res.status(404).json({ error: "Package not found" });
    res.status(200).json(updatedPackage);
  } catch (err) {
    console.error("Error updating package:", err);
    res.status(500).json({ error: "Failed to update package" });
  }
};

// DELETE package by ID
const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await TourPackage.findByIdAndDelete(req.params.id);
    if (!deletedPackage)
      return res.status(404).json({ error: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete package" });
  }
};

export {
   getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
}