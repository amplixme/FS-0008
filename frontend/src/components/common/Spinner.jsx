import ProgressActivityIcon from "~icons/material-symbols/progress-activity";

function Spinner({ icon: Icon = ProgressActivityIcon, message }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-surface-container-high bg-surface-container-lowest min-h-fit w-full">
      <Icon
        className="text-5xl mb-4 animate-spin text-primary"
        aria-hidden="true"
      />
      <p className="text-on-surface-variant font-medium text-lg">{message}</p>
    </div>
  );
}

export default Spinner;
