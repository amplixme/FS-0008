import cloudinary from "../utils/cloudinary.js";

const cloudinary_folder = process.env.CLOUDINARY_FOLDER;

export const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: cloudinary_folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};
