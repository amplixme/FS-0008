import { Link, useLocation } from "react-router";
import HomeIcon from "~icons/material-symbols/home-outline";
import EditIcon from "~icons/material-symbols/edit-outline";
import FolderIcon from "~icons/material-symbols/folder-outline";
import LogoutIcon from "~icons/material-symbols/logout-outline";
import PersonIcon from "~icons/material-symbols/person-outline";
import AdminPanelSettingsIcon from "~icons/material-symbols/admin-panel-settings-outline";
import CloseIcon from "~icons/material-symbols/close";
import MenuItem from "../common/MenuItem";
import useAuth from "../../hooks/useAuth";
import { useCategories } from "../../hooks/useCategories";
import { useModalKeyboard } from "../../hooks/useModalKeyboard";
import { CATEGORY_ICONS } from "../../constants/categories";
import Avatar from "./Avatar";

function Drawer({ onClose }) {
  const drawerRef = useModalKeyboard(onClose);
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      {/* overlay oscuro */}
      <div
        className="fixed inset-0 z-40 bg-on-background/60"
        onClick={onClose}
      />
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        tabIndex={-1}
        className="fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 h-full w-80 rounded-r-2xl shadow-2xl flex flex-col font-inter antialiased overflow-hidden"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <CloseIcon className="text-xl" aria-hidden="true" />
          </button>
        </div>

        {isAuthenticated ? (
          <header className="flex flex-col p-6 gap-3 bg-surface-container-low/50 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0">
                <Avatar
                  src={user?.avatarUrl}
                  name={user?.name}
                  size="lg"
                  showStatus
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold tracking-tight text-on-surface truncate">
                  {user?.name || "Usuario"}
                </h2>
                <p className="text-xs text-on-surface-variant font-medium truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          </header>
        ) : (
          <header className="flex flex-col p-6 gap-3 bg-surface-container-low/50 border-b border-outline-variant/10">
            <div className="space-y-1">
              <h2 className="text-lg font-bold tracking-tight text-on-surface">
                Bienvenido a TheCanvas
              </h2>
              <p className="text-xs text-on-surface-variant">
                Inicia sesión para publicar y comentar.
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                onClick={onClose}
                className="w-full text-center py-2.5 px-4 rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="w-full text-center py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.98] transition-all"
              >
                Crear cuenta
              </Link>
            </div>
          </header>
        )}

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            <MenuItem
              label="Inicio"
              icon={HomeIcon}
              to="/"
              isActive={pathname === "/"}
              onClick={onClose}
            />
            <MenuItem
              label="Escribir artículo"
              icon={EditIcon}
              to="/posts/create-post"
              isActive={pathname === "/posts/create-post"}
              onClick={onClose}
            />
            {isAuthenticated && (
              <MenuItem
                label="Mi perfil"
                icon={PersonIcon}
                to={`/perfil/${user?.id}`}
                isActive={pathname === `/perfil/${user?.id}`}
                onClick={onClose}
              />
            )}
            {isAuthenticated && user?.role === "ADMIN" && (
              <MenuItem
                label="Panel de Administración"
                icon={AdminPanelSettingsIcon}
                to="/admin"
                isActive={pathname.startsWith("/admin")}
                onClick={onClose}
              />
            )}
          </div>

          <div className="mt-6 mb-4">
            <div className="flex items-center justify-between px-4 mb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant/70">
                Categorías
              </h3>
              <FolderIcon className="text-sm text-outline" aria-hidden="true" />
            </div>

            {categoriesLoading ? (
              <p className="px-4 py-2 text-xs text-outline">
                Cargando categorías...
              </p>
            ) : (
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id || cat.slug}>
                    <MenuItem
                      label={cat.name}
                      icon={CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS.default}
                      badge={cat.postsCount}
                      to={`/?category=${cat.slug}`}
                      onClick={onClose}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <footer className="p-4 border-t border-slate-100 dark:border-slate-800">
          {isAuthenticated && (
            <MenuItem
              label="Cerrar sesión"
              icon={LogoutIcon}
              variant="danger"
              onClick={handleLogout}
            />
          )}
          <div className="mt-2 px-4">
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
