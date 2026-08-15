import { useState } from "react";
import { uploadImage } from "../../services/upload.service";
import CloseIcon from "~icons/material-symbols/close";
import ImageIcon from "~icons/material-symbols/image";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Solo se permiten imagenes JPG, PNG o WEBP.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "La imagen no puede superar los 5MB.";
  }
  return null;
}

function ImageUpload({
  value,
  onChange,
  id = "image-upload",
  alt = "Vista previa de la imagen",
  aspectRatio = "aspect-[21/9]",
  recommendation = "Recomendado: 1920x1080px",
}) {
  const [preview, setPreview] = useState(value || null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  async function handleFile(file) {
    setError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setPreview(localPreviewUrl);
    setIsUploading(true);
    setProgress(0);

    try {
      const result = await uploadImage(file, setProgress);
      URL.revokeObjectURL(localPreviewUrl);
      setPreview(result.url);
      onChange?.(result.url);
    } catch (err) {
      URL.revokeObjectURL(localPreviewUrl);
      setError(err.message);
      setPreview(value || null);
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputChange(event) {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
    event.target.value = ""; // permite volver a elegir el mismo archivo
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove(event) {
    event.preventDefault();
    event.stopPropagation();
    setPreview(null);
    setError(null);
    onChange?.(null);
  }

  return (
    <div>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative w-full ${aspectRatio} rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${
          isDragging
            ? "border-primary bg-primary-fixed"
            : "border-outline-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-primary-fixed"
        }`}
      >
        <input
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="sr-only"
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt={alt}
              className="w-full h-full object-cover"
            />

            {!isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label="Eliminar imagen"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-on-surface/70 text-surface flex items-center justify-center hover:bg-on-surface transition-colors"
              >
                <CloseIcon className="text-lg" aria-hidden="true" />
              </button>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-on-surface/50 flex flex-col items-center justify-center gap-3 px-6">
                <div className="w-full max-w-xs h-2 bg-surface/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-surface text-sm font-semibold">
                  Subiendo... {progress}%
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <ImageIcon
              className="text-4xl text-outline mb-3"
              aria-hidden="true"
            />
            <p className="text-on-surface-variant font-medium">
              Arrastra una imagen o haz clic para subir
            </p>
            <p className="text-xs text-outline mt-1 uppercase tracking-widest">
              {recommendation}
            </p>
          </>
        )}
      </label>

      {error && (
        <p role="alert" className="text-sm text-error mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
