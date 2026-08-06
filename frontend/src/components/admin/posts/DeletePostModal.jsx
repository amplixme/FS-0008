import { useState } from "react";
import { deletePost } from "../../../services/admin.service";
import ConfirmModal from "../../common/ConfirmModal";

function DeletePostModal({ post, onClose, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deletePost(post.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Error al eliminar el post.");
    } finally {
      setIsDeleting(false);
    }
  };

  const modalMessage = error ? (
    <span className="text-error font-medium">{error}</span>
  ) : (
    <>
      ¿Estás seguro de que querés eliminar el post{" "}
      <strong className="text-on-surface">{post?.title}</strong>? Esta acción
      no se puede deshacer.
    </>
  );

  return (
    <ConfirmModal
      isOpen={Boolean(post)}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Eliminar post"
      message={modalMessage}
      isProcessing={isDeleting}
      confirmText={isDeleting ? "Eliminando..." : "Eliminar post"}
      isDestructive={true}
    />
  );
}

export default DeletePostModal;
