import { Link } from "react-router";
import SearchOffIcon from "~icons/material-symbols/search-off";
import HomeIcon from "~icons/material-symbols/home";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-24 min-h-[60vh]">
      <SearchOffIcon
        className="text-6xl mb-4 text-outline"
        aria-hidden="true"
      />
      <h1 className="text-6xl font-extrabold text-primary tight-tracking mb-2">
        404
      </h1>
      <p className="text-xl font-bold text-on-surface mb-2">
        Página no encontrada
      </p>
      <p className="text-on-surface-variant font-medium mb-8 max-w-md">
        La página que estás buscando no existe o fue movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <HomeIcon className="text-sm" aria-hidden="true" />
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
