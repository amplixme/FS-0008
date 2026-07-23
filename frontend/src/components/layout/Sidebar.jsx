import { useSearchParams } from "react-router";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import { CATEGORY_ICONS } from "../../constants/categories";

function Sidebar({ categories, isLoading, error, onRetry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const handleSelectCategory = (categorySlug) => {
    const nextParams = new URLSearchParams(searchParams);

    if (categorySlug) {
      nextParams.set("category", categorySlug);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
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
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="hidden md:block text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 tight-tracking">
        Categorías
      </h2>

      {/* Vista Mobile (< md): Chips horizontales scrollables */}
      <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2 py-2 mb-4">
        <button
          onClick={() => handleSelectCategory(null)}
          className={`flex items-center gap-2 shrink-0 px-5 py-2 rounded-full text-sm transition-all ${
            !selectedCategory
              ? "bg-blue-700 text-white font-semibold shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <span className="material-symbols-outlined text-sm">grid_view</span>
          Todas las categorías
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
    </aside>
  );
}

export default Sidebar;
