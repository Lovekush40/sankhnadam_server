
const asyncHandler = (controller) => {
    return async (req, res, next) => {  
        try {
            await controller(req, res, next);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};

export default asyncHandler;