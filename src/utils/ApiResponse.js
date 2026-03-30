//crea a standard response format for all api responses
class ApiResponse {
    constructor(statuscode, data, message = "success") { 
        this.success = true;
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;    
    }
}

export default ApiResponse;