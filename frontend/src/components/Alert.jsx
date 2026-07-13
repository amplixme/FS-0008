const ALERT_CONFIGS = {
  success: {
    container: "text-emerald-700 bg-emerald-50 border-emerald-200",
    icon: "check_circle",
    iconColor: "text-emerald-600",
  },
  error: {
    container: "text-red-700 bg-red-50 border-red-200",
    icon: "error",
    iconColor: "text-red-600",
  },
  info: {
    container: "text-blue-700 bg-blue-50 border-blue-200",
    icon: "info",
    iconColor: "text-blue-600",
  },
};

function Alert({ type = "info", message }) {
  // Si no hay mensaje, no renderiza nada
  if (!message) return null;

  // Busca la configuración del tipo solicitado; si no existe, usa 'info' por defecto
  const config = ALERT_CONFIGS[type] || ALERT_CONFIGS.info;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`text-sm border rounded-xl px-3 py-2.5 flex items-center gap-1.5 ${config.container}`}
    >
      <span
        className={`material-symbols-outlined text-lg shrink-0 mt-0.5 ${config.iconColor}`}
      >
        {config.icon}
      </span>
      <span className="flex-1">{message}</span>
    </div>
  );
}

export default Alert;
