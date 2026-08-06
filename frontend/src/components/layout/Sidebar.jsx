import { useSearchParams } from "react-router";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import { CATEGORY_ICONS } from "../../constants/categories";

function Sidebar({ categories, isLoading, error, onRetry }) {
  const [searchParams, setSearchParams] = useSearchParams({ sort: "newest" });
  const selectedCategory = searchParams.get("category");
  const currentSort = searchParams.get("sort");

  const handleSelectCategory = (categorySlug) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (categorySlug) {
        params.set("category", categorySlug);
      } else {
        params.delete("category");
      }
      params.delete("page"); // Resetear la pagina al cambiar el orden
      return params;
    });
  };

  const handleSelectSort = (sortOption) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("sort", sortOption);
      params.delete("page"); // Resetear la pagina al cambiar el orden
      return params;
    });
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-64 shrink-0">
        <Spinner icon="progress_activity" message="Cargando categorías..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:w-64 shrink-0">
        <ErrorMessage
          icon="error"
          message="Error al cargar categorías"
          onRetry={onRetry}
        />
      </div>
    );
  }

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
      {/* SECCION FILTROS */}
      <div className="w-full">
        <h2 className="hidden md:block text-sm font-bold text-slate-900 dark:text-slate-50 mb-3 tight-tracking">
          Ordenar por
        </h2>
        <label htmlFor="sort-select" className="sr-only">
          Ordenar publicaciones
        </label>
        <div className="relative">
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => handleSelectSort(e.target.value)}
            className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="comments">Más comentados</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            expand_more
          </span>
        </div>
      </div>

      {/* SECCION CATEGORIAS */}
      <div>
        <h2 className="hidden md:block text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 tight-tracking">
          Categorías
        </h2>

        {/* Vista Mobile (< md): Chips horizontales scrollables */}
        <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2 py-2">
          <button
            onClick={() => handleSelectCategory(null)}
            className={`flex items-center gap-2 shrink-0 px-5 py-2 rounded-full text-sm transition-all ${
              !selectedCategory
                ? "bg-blue-700 text-white font-semibold shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            Todas
          </button>

          {categories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            const iconName =
              CATEGORY_ICONS[category.slug] || CATEGORY_ICONS.default;

            return (
              <button
                key={category.id || category.slug}
                onClick={() => handleSelectCategory(category.slug)}
                className={`flex items-center gap-2 shrink-0 px-5 py-2 rounded-full text-sm transition-all ${
                  isSelected
                    ? "bg-blue-700 text-white font-semibold shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {iconName}
                </span>
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Vista Desktop (>= md): Lista vertical */}
        <ul className="hidden md:block space-y-2">
          <li>
            <button
              onClick={() => handleSelectCategory(null)}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm font-medium transition-all hover:translate-x-1 ${
                !selectedCategory
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                grid_view
              </span>
              Todas las categorías
            </button>
          </li>
          {categories.map((category) => {
            const iconName =
              CATEGORY_ICONS[category.slug] || CATEGORY_ICONS.default;
            const isSelected = selectedCategory === category.slug;

            return (
              <li key={category.id || category.slug}>
                <button
                  onClick={() => handleSelectCategory(category.slug)}
                  className={`flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm font-medium transition-all hover:translate-x-1 ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {iconName}
                  </span>
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
