function ErrorMessage({ icon, message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-surface-container-high bg-surface-container-lowest min-h-75 w-full">
      <span className="material-symbols-outlined text-5xl mb-4 text-red-500 dark:text-red-400">
        {icon}
      </span>
      <p className="text-on-surface-variant font-medium text-lg mb-6">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">refresh</span>
        Reintentar
      </button>
    </div>
  );
}

export default ErrorMessage;
