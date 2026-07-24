import { useState } from "react";
import { remove } from "../../services/category.service";
import ConfirmModal from "../common/ConfirmModal";

export function DeleteCategoryModal({ category, onClose, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await remove(category.id);
      onSuccess(); // Triggerea refetch() en el componente padre
      onClose(); // Cierra el modal
    } catch (err) {
      // Errores del backend
      setError(err.message || "Error al eliminar la categoría.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Mensaje del modal, mostrando error si existe
  const modalMessage = error ? (
    <span className="text-error font-medium">{error}</span>
  ) : (
    <>
      ¿Estás seguro de que deseas eliminar la categoría{" "}
      <strong className="text-on-surface">{category?.name}</strong>? Esta acción
      no se puede deshacer.
    </>
  );

  return (
    <ConfirmModal
      isOpen={Boolean(category)}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Eliminar Categoría"
      message={modalMessage}
      isProcessing={isDeleting}
    />
  );
}
