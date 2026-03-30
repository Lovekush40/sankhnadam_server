import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        }
    }
)

export const Message = mongoose.model("Message", messageSchema)