import { Link, useLocation } from "react-router";
import MenuIcon from "~icons/material-symbols/menu";
import SearchIcon from "~icons/material-symbols/search";
import CloseIcon from "~icons/material-symbols/close";
import Drawer from "../ui/Drawer";
import SearchInput from "../common/SearchInput";
import { useState, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const activeLinkClass =
  "text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700 dark:border-blue-400 pb-1 font-inter tracking-tight";
const inactiveLinkClass =
  "text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-inter tracking-tight pb-1 border-b-2 border-transparent";

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { pathname } = useLocation();

  // Reset de estados al navegar
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setShowSearch(false);
    setShowUserMenu(false);
  }

  // Cerrar el menu dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showDrawer && <Drawer onClose={() => setShowDrawer(false)} />}
      <header className="fixed top-0 w-full z-30 bg-white/80 dark:bg-slate-900/80 opacity-95 shadow-sm dark:shadow-none backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              className="block sm:hidden active:scale-95 h-fit transition-transform text-primary shrink-0"
              onClick={() => setShowDrawer(!showDrawer)}
              aria-label="Abrir menú"
            >
              <MenuIcon className="text-2xl" aria-hidden="true" />
            </button>

            <Link
              className="shrink-0 flex items-center"
              to="/"
              aria-label="Ir al inicio"
            >
              <img
                src="/logo.webp"
                alt="Logo de TheCanvas"
                className="h-10 md:h-12 w-auto object-contain block shrink-0"
              />
            </Link>

            {/* Navegacion principal */}
            <nav
              className="hidden sm:flex gap-6 items-center"
              aria-label="Menú principal"
            >
              <Link
                to="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={
                  pathname === "/" ? activeLinkClass : inactiveLinkClass
                }
              >
                Recientes
              </Link>
              <Link
                to="/posts/create-post"
                aria-current={
                  pathname === "/posts/create-post" ? "page" : undefined
                }
                className={
                  pathname === "/posts/create-post"
                    ? activeLinkClass
                    : inactiveLinkClass
                }
              >
                Escribir
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors active:scale-95 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  <div className="w-9 h-9 rounded-full bg-surface-container overflow-hidden border-2 border-primary/20 shrink-0">
                    <img
                      alt={`Avatar de ${user?.name || "Usuario"}`}
                      className="w-full h-full object-cover"
                      src={user?.avatarUrl || "https://placehold.co/40x40"}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-inter tracking-tight">
                    {user?.name || "Usuario"}
                  </span>
                </button>

                {/* Dropdown de opciones */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/80 py-1.5 z-50 animate-in fade-in duration-150">
                    <Link
                      to={`/perfil/${user?.id}`}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      Mi perfil
                    </Link>

                    {user?.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        Panel de Administración
                      </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-700/60 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  className="hidden sm:block px-5 py-2 text-slate-600 font-medium hover:bg-slate-50 transition-colors duration-200 rounded-full"
                  to="/login"
                >
                  Iniciar sesión
                </Link>
                <Link
                  className="px-6 py-2 hidden sm:block bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-transform active:scale-95 duration-200"
                  to="/register"
                >
                  Suscribirse
                </Link>
              </>
            )}

            {/* Toggle de busqueda mobile */}
            <button
              type="button"
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label={showSearch ? "Cerrar buscador" : "Abrir buscador"}
              className="active:scale-95 transition-transform text-primary block sm:hidden shrink-0"
            >
              {showSearch ? (
                <CloseIcon className="text-2xl" aria-hidden="true" />
              ) : (
                <SearchIcon className="text-2xl" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown de busqueda mobile */}
        {showSearch && (
          <div className="block sm:hidden border-t border-outline/10 bg-white/95 dark:bg-slate-900/95 px-6 py-3 shadow-md">
            <SearchInput
              id="header-mobile-search"
              autoFocus
              inputClassName="py-3 text-base"
            />
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
