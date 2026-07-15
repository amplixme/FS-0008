function ToggleSwitch({ label, description, ref, ...props }) {
  return (
    <div className="flex items-center justify-between gap-4 p-6 bg-surface-container-low rounded-xl">
      <div>
        {label && <h4 className="font-bold text-on-surface">{label}</h4>}
        {description && (
          <p className="text-sm text-on-surface-variant">{description}</p>
        )}
      </div>

      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          {...props}
        />

        <div
          className="w-11 h-6 bg-outline-variant rounded-full peer
            peer-checked:bg-primary
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30
            after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
            peer-checked:after:translate-x-full"
        />
      </label>
    </div>
  );
}

export default ToggleSwitch;