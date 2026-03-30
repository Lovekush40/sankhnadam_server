import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: true }, 
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    role: { type: String, enum: ["user", "admin"], default: "user" }, 
  },
  { timestamps: true } 
);

userSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            phone: this.phone,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model("User", userSchema);