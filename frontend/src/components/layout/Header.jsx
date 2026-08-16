import { Link, useLocation } from "react-router";
import MenuIcon from "~icons/material-symbols/menu";
import SearchIcon from "~icons/material-symbols/search";
import Drawer from "../ui/Drawer";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const activeLinkClass =
  "text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700 dark:border-blue-400 pb-1 font-inter tracking-tight";
const inactiveLinkClass =
  "text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-inter tracking-tight pb-1 border-b-2 border-transparent";

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {showDrawer && <Drawer onClose={() => setShowDrawer(false)} />}
      <header className="fixed top-0 w-full z-30 bg-white/80 dark:bg-slate-900/80 opacity-95 shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-6 md:gap-8">
            {/* menu burger */}
            <button
              className="block lg:hidden active:scale-95 h-fit transition-transform text-primary"
              onClick={() => {
                setShowDrawer(!showDrawer);
              }}
            >
              <MenuIcon className="text-2xl" aria-hidden="true" />
            </button>

            <Link
              className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tight-tracking"
              to="/"
            >
              <img src="/logo.webp" alt="Logo de TheCanvas" className="h-12" />
            </Link>
            <nav className="hidden lg:flex gap-6" aria-label="Menú principal">
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

              {/* Si el usuario es Admin mostramos en la navegación esta ruta */}
              {user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  aria-current={pathname === "/admin" ? "page" : undefined}
                  className={
                    pathname === "/admin" ? activeLinkClass : inactiveLinkClass
                  }
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={`/perfil/${user?.id}`}
                  className="hidden lg:block text-slate-700 dark:text-slate-200 font-medium font-inter tracking-tight hover:text-primary"
                >
                  Hola, {user?.name || "Usuario"}
                </Link>
                <button
                  onClick={logout}
                  className="px-6 py-2 hidden lg:block bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-transform active:scale-95 duration-200"
                >
                  Cerrar sesión
                </button>
                <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border-2 border-primary/10 hidden lg:block">
                  <img
                    alt={`Avatar de ${user?.name || "Usuario"}`}
                    className="w-full h-full object-cover"
                    src={user?.avatarUrl || "https://placehold.co/40x40"}
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  className="hidden lg:block px-5 py-2 text-slate-600 font-medium hover:bg-slate-50 transition-colors duration-200 rounded-full"
                  to="/login"
                >
                  Iniciar sesión
                </Link>
                <Link
                  className="px-6 py-2 hidden lg:block bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-transform active:scale-95 duration-200"
                  to="/register"
                >
                  Suscribirse
                </Link>
              </>
            )}
            <button className="active:scale-95 transition-transform text-primary block lg:hidden">
              <SearchIcon className="text-2xl" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
