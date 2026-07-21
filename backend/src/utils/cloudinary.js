import { v2 as cloudinary } from "cloudinary";

// En esta configuración forzamos "secure" para que las URLs devueltas sean siempre https.
cloudinary.config({
  secure: true,
});

export default cloudinary;