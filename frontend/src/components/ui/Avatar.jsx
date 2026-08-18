const DEFAULT_AVATAR = "https://placehold.co/150x150";

const SIZES = {
  sm: {
    container: "w-8 h-8",
    status: "w-2.5 h-2.5 border-[1.5px]",
  },
  md: {
    container: "w-9 h-9",
    status: "w-3 h-3 border-2",
  },
  lg: {
    container: "w-14 h-14",
    status: "w-3.5 h-3.5 border-2",
  },
  xl: {
    container: "w-32 h-32",
    status: "w-6 h-6 border-4",
  },
};

function Avatar({
  src,
  name = "Usuario",
  size = "md",
  showStatus = false,
  className = "",
}) {
  const sizeConfig = SIZES[size] || SIZES.md;

  const handleImageError = (e) => {
    if (e.currentTarget.src !== DEFAULT_AVATAR) {
      e.currentTarget.src = DEFAULT_AVATAR;
    }
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <img
        src={src || DEFAULT_AVATAR}
        alt={`Avatar de ${name}`}
        onError={handleImageError}
        className={`rounded-full object-cover bg-surface-container border border-outline-variant/20 ${sizeConfig.container}`}
      />

      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 rounded-full bg-emerald-500 border-white dark:border-slate-900 ${sizeConfig.status}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Avatar;
