import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    console.log("jwt running");

    const authHeader = req.header("Authorization");

    const token =
      req.cookies?.accessToken ||
      (authHeader && authHeader.replace("Bearer ", ""));

    if (!token) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id)
      .select("-password -refreshToken");

    if (!user) {
      return next(new ApiError(401, "Invalid Access Token"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, error?.message || "Invalid Access Token"));
  }
};

export const requireAdmin = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};