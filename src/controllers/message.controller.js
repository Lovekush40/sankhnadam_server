import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createMessage = asyncHandler(async(req, res) => {
    const {message} = req.body;

    if(!message.trim()){
        throw new ApiError(
            400,
            "message are required"
        )
    }

    const user = req.user

    if(!user){
        throw new ApiError(
            400,
            "Unauthorized request"
        )
    }

    const createdMessage = await Message.create(
        {
            name: user.name,
            email: user.email,
            message
        }
    )

    if(!createdMessage){
        throw new ApiError(
            500,
            "Something went wrong while sending message"
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdMessage,
            "message sent successfully"
        )
    )
})

export {
    createMessage
}