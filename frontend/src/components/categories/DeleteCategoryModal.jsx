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

  // Mensaje del modal
  const modalMessage = error ? (
    <span className="text-red-600 font-medium">{error}</span>
  ) : (
    <>
      ¿Estás seguro de que deseas eliminar la categoría{" "}
      <strong className="text-slate-900">{category?.name}</strong>? Esta acción
      no se puede deshacer.
    </>
  );

  return (
    <ConfirmModal
      isOpen={Boolean(category)}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Eliminar categoría"
      message={modalMessage}
      isProcessing={isDeleting}
      confirmText={isDeleting ? "Eliminando..." : "Eliminar categoría"}
      isDestructive={true}
    />
  );
}
