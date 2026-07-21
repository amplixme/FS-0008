import { uploadImageToCloudinary } from "../services/upload.service.js";
import { success } from "../utils/response.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("No se recibio ningun archivo");
      error.status = 400;
      return next(error);
    }

    const result = await uploadImageToCloudinary(req.file.buffer);

    return success(res, { url: result.secure_url }, 201);
  } catch (error) {
    next(error);
  }
};
