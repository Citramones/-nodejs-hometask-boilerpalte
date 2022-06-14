const responseMiddleware = (err,req, res, next) => {
        if(err instanceof ValidationError){
        return res.status(someError.status).json({ error: true, message: err.message });}
        return next(ValidationError.unknownError('unknown error'))
}

class ValidationError  extends Error {
        constructor(status, message) {
                super();
                this.error=true;
                this.status = status;
                this.message = message;
        }
        static requestError(message) {
                const newEror=new ValidationError(404, message)
                console.log(JSON.stringify(newEror))
                return JSON.stringify(newEror);
        }
        static validationError(message) {
                const newEror=new ValidationError(400, message)
                return JSON.stringify(newEror);
        }
        static unknownError(message) {
                const newEror=new ValidationError(500, message)
                return JSON.stringify(newEror);
        }


}
exports.responseMiddleware = responseMiddleware;
exports.ValidationError = ValidationError;