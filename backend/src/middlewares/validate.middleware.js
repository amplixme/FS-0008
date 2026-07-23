export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); 
        next(); 
    } catch (error) {
        const validationError = new Error("Validation failed");
        validationError.status = 400;
        validationError.details = error.errors;
        next(validationError); 
    }
};
