import { useState } from "react";
import { deleteUser } from "../../../services/admin.service";
import ConfirmModal from "../../common/ConfirmModal";

function DeleteUserModal({ user, onClose, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteUser(user.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Error al eliminar el usuario.");
    } finally {
      setIsDeleting(false);
    }
  };

  const modalMessage = error ? (
    <span className="text-error font-medium">{error}</span>
  ) : (
    <>
      ¿Estás seguro de que querés eliminar a{" "}
      <strong className="text-on-surface">{user?.name}</strong>? Se eliminarán
      también todos sus posts y comentarios. Esta acción no se puede deshacer.
    </>
  );

  return (
    <ConfirmModal
      isOpen={Boolean(user)}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Eliminar usuario"
      message={modalMessage}
      isProcessing={isDeleting}
      confirmText={isDeleting ? "Eliminando..." : "Eliminar usuario"}
      isDestructive={true}
    />
  );
}

export default DeleteUserModal;
