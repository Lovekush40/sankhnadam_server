// create a api error class that extends the built in error class
class ApiError extends Error {
    constructor(statuscode, message) {
        super(message);
        this.success = false;
        this.statuscode = statuscode;
    }
}

export default ApiError;