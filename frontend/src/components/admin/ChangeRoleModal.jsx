import { useState } from "react";
import { changeUserRole } from "../../services/admin.service";
import ConfirmModal from "../common/ConfirmModal";

function ChangeRoleModal({ user, onClose, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const nextRole = user?.role === "ADMIN" ? "USER" : "ADMIN";

  const handleConfirm = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      await changeUserRole(user.id, nextRole);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Error al cambiar el rol del usuario.");
    } finally {
      setIsProcessing(false);
    }
  };

  const modalMessage = error ? (
    <span className="text-error font-medium">{error}</span>
  ) : (
    <>
      ¿Cambiar el rol de <strong className="text-on-surface">{user?.name}</strong>{" "}
      de <strong>{user?.role}</strong> a <strong>{nextRole}</strong>?
    </>
  );

  return (
    <ConfirmModal
      isOpen={Boolean(user)}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Cambiar rol"
      message={modalMessage}
      isProcessing={isProcessing}
      confirmText={isProcessing ? "Cambiando..." : "Cambiar rol"}
    />
  );
}

export default ChangeRoleModal;
