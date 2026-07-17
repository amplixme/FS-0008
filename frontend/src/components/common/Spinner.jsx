function Spinner({ icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-surface-container-high bg-surface-container-lowest min-h-75 w-full">
      <span className="material-symbols-outlined text-5xl mb-4 animate-spin text-primary">
        {icon}
      </span>
      <p className="text-on-surface-variant font-medium text-lg">{message}</p>
    </div>
  );
}

export default Spinner;
