import WarningIcon from "~icons/material-symbols/warning-outline";
import CloseIcon from "~icons/material-symbols/close";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isProcessing,
  confirmText = "Confirmar",
  isDestructive = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="title-md font-bold text-slate-900 flex items-center gap-2">
            {isDestructive && (
              <WarningIcon className="text-red-500" aria-hidden="true" />
            )}
            {title || "Confirmar acción"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <p className="text-slate-600 text-lg leading-relaxed">{message}</p>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-slate-50 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-full text-slate-600 font-semibold border-2 border-slate-200 hover:bg-slate-100 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-6 py-2.5 rounded-full text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 ${
              isDestructive
                ? "bg-red-600 shadow-red-500/30 hover:shadow-red-500/40 hover:bg-red-700"
                : "bg-primary shadow-blue-500/30 hover:shadow-blue-500/40"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
