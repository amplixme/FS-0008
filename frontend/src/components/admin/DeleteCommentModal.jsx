import { useState } from "react";
import { deleteComment } from "../../services/admin.service";
import ConfirmModal from "../common/ConfirmModal";
import { truncateText } from "../../utils/utils";

function DeleteCommentModal({ comment, onClose, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteComment(comment.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Error al eliminar el comentario.");
    } finally {
      setIsDeleting(false);
    }
  };

  const modalMessage = error ? (
    <span className="text-error font-medium">{error}</span>
  ) : (
    <>
      ¿Estás seguro de que querés eliminar el comentario{" "}
      <strong className="text-on-surface">
        "{truncateText(comment?.content, 80)}"
      </strong>
      ? Esta acción no se puede deshacer.
    </>
  );

  return (
    <ConfirmModal
      isOpen={Boolean(comment)}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Eliminar comentario"
      message={modalMessage}
      isProcessing={isDeleting}
      confirmText={isDeleting ? "Eliminando..." : "Eliminar comentario"}
      isDestructive={true}
    />
  );
}

export default DeleteCommentModal;
