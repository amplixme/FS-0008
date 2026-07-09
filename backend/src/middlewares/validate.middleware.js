// funcion placeholder
export function validate(schema) {
  return async (req, res, next) => {
    console.log("validado");
    next();
  };
}
