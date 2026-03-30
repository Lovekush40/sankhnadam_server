import { Router } from "express";
import { getPackageById, getPackages, updatePackage, createPackage, deletePackage } from "../controllers/tourPackages.controller.js";
const router = Router();

router.get("/", getPackages);

// GET single package by ID
router.get("/:id", getPackageById);

// CREATE new package
router.post("/", createPackage);

// UPDATE package by ID
router.put("/:id", updatePackage);

// DELETE package by ID
router.delete("/:id", deletePackage);

export default router