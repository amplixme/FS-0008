import api from "./api";

export async function uploadImage(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (!onUploadProgress || !progressEvent.total) return;

      // Barra de progreso de carga de imagen
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      onUploadProgress(percent);
    },
  });

  return response;
}