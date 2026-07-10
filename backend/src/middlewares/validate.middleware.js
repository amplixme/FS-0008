export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Si esto falla, salta al catch
        next(); // Si pasa, continúa al controlador
    } catch (error) {
        // AQUÍ ES DONDE DEBE ENTRAR SI LOS DATOS SON MALOS
        const validationError = new Error("Validation failed");
        validationError.status = 400;
        validationError.details = error.errors;
        next(validationError); 
    }
};
