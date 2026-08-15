import CheckCircleIcon from "~icons/material-symbols/check-circle";
import ErrorIcon from "~icons/material-symbols/error-outline";
import InfoIcon from "~icons/material-symbols/info-outline";

const ALERT_CONFIGS = {
  success: {
    container: "text-emerald-700 bg-emerald-50 border-emerald-200",
    icon: CheckCircleIcon,
    iconColor: "text-emerald-600",
  },
  error: {
    container: "text-red-700 bg-red-50 border-red-200",
    icon: ErrorIcon,
    iconColor: "text-red-600",
  },
  info: {
    container: "text-blue-700 bg-blue-50 border-blue-200",
    icon: InfoIcon,
    iconColor: "text-blue-600",
  },
};

function Alert({ type = "info", message }) {
  // Si no hay mensaje, no renderiza nada
  if (!message) return null;

  // Busca la configuración del tipo solicitado; si no existe, usa 'info' por defecto
  const config = ALERT_CONFIGS[type] || ALERT_CONFIGS.info;
  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`text-sm border rounded-xl px-3 py-2.5 flex items-center gap-1.5 ${config.container}`}
    >
      <Icon
        className={`text-lg shrink-0 mt-0.5 ${config.iconColor}`}
        aria-hidden="true"
      />
      <span className="flex-1">{message}</span>
    </div>
  );
}

export default Alert;
