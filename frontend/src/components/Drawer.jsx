import { useEffect } from "react";
import { Link } from "react-router";
import { CATEGORIAS, USER } from "../data/data";

function Drawer({ onClose }) {
  // para que se cierre con "ESC"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {/* overlay oscuro */}
      <div
        className="fixed inset-0 z-40 bg-on-background/60"
        onClick={() => onClose()}
      ></div>
      <aside className="fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 h-full w-80 rounded-r-2xl shadow-2xl flex flex-col font-inter antialiased overflow-hidden">
        {/* seccion perfil */}
        <header className="flex flex-col p-8 gap-4 bg-surface-container-low/50">
          <div className="relative w-16 h-16">
            <img
              className="w-16 h-16 rounded-full object-cover"
              alt={USER.name}
              src={USER.avatarUrl}
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-on-surface">
              {USER.name}
            </h2>
            <p className="text-sm text-on-surface-variant font-medium">
              {USER.email}
            </p>
          </div>
        </header>
        {/* nav principal */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-slate-700 dark:text-slate-300">
            {/*  nav items */}
            <Link
              className="flex items-center gap-4 px-4 py-3 transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              to="#"
            >
              <span
                className="material-symbols-outlined text-slate-400"
                data-icon="home"
              >
                home
              </span>
              <span className="font-medium">Inicio</span>
            </Link>
            <Link
              className="rounded-lg px-4 py-3 flex items-center gap-4 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
              to="#"
            >
              <span
                className="material-symbols-outlined"
                data-icon="edit"
                style={{ fontVariationSettings: "FILL" }}
              >
                edit
              </span>
              <span>Escribir artículo</span>
            </Link>
          </div>
          {/* seccion categorias */}
          <div className="mt-8 mb-4">
            <div className="flex items-center justify-between px-4 mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                Categorías
              </h3>
              <span
                className="material-symbols-outlined text-sm text-outline"
                data-icon="category"
              >
                category
              </span>
            </div>
            {/* lista de categorias */}
            <ul className="space-y-1">
              {CATEGORIAS.map((categoria, index) => (
                <li key={index}>
                  <Link
                    className="flex items-center justify-between px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
                    to="#"
                  >
                    <span className="font-medium">{categoria.name}</span>
                    <span className="bg-surface-container text-xs font-bold px-2 py-1 rounded-md text-on-surface-variant group-hover:bg-white transition-colors">
                      {categoria.numberOfPosts}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {/* footer */}
        <footer className="p-6 border-t border-slate-100 dark:border-slate-800">
          <Link
            className="flex items-center gap-4 text-error px-4 py-3 hover:bg-error-container/20 transition-all rounded-lg group"
            to="#"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span className="font-bold">Cerrar Sesión</span>
          </Link>
          <div className="mt-4 px-4">
            <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">
              TheCanvas
            </p>
          </div>
        </footer>
      </aside>
    </>
  );
}

export default Drawer;
