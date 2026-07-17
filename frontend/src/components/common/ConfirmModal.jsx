function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isProcessing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-extrabold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-2xl">warning</span>
          {title || "Confirmar acción"}
        </h2>
        <p className="text-on-surface-variant text-[1.1rem] leading-[1.6] mb-8">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-full font-semibold text-on-surface-variant bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-full font-semibold text-white bg-error hover:bg-error/90 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isProcessing ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;