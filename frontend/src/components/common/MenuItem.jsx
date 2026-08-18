import { Link } from "react-router";

function MenuItem({
  label,
  icon: Icon,
  badge,
  to,
  onClick,
  isActive = false,
  variant = "default", // "default" | "danger"
  className = "",
}) {
  const isDanger = variant === "danger";

  const baseStyles =
    "group flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-left cursor-pointer";

  const variantStyles = isDanger
    ? "text-error hover:bg-error-container/20"
    : isActive
      ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 hover:translate-x-1";

  const iconStyles = isDanger
    ? "text-error"
    : isActive
      ? "text-blue-700 dark:text-blue-400"
      : "text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400";

  const content = (
    <>
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <Icon
            className={`text-lg shrink-0 ${iconStyles}`}
            aria-hidden="true"
          />
        )}
        <span className="truncate">{label}</span>
      </div>

      {badge !== undefined && badge !== null && (
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-md transition-colors shrink-0 ml-2 ${
            isActive
              ? "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400"
              : "bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 group-hover:bg-white dark:group-hover:bg-slate-700"
          }`}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {content}
    </button>
  );
}

export default MenuItem;
