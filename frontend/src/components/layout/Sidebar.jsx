import { useSearchParams } from "react-router";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";

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
      <h2 className="hidden md:block text-lg font-semibold mb-4">Categorías</h2>

      {/* Vista Mobile (< md): Chips horizontales scrollables */}
      <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2 py-2 mb-4">
        <button
          onClick={() => handleSelectCategory(null)}
          className={`shrink-0 px-5 py-2 rounded-full text-sm transition-all ${
            !selectedCategory
              ? "bg-[#024ce2] text-white font-semibold"
              : "bg-gray-100 text-slate-600 font-medium hover:bg-gray-200"
          }`}
        >
          Todas las categorías
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.slug;

          return (
            <button
              key={category.id || category.slug}
              onClick={() => handleSelectCategory(category.slug)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm transition-all ${
                isSelected
                  ? "bg-[#024ce2] text-white font-semibold"
                  : "bg-gray-100 text-slate-600 font-medium hover:bg-gray-200"
              }`}
            >
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
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Todas las categorías
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id || category.slug}>
            <button
              onClick={() => handleSelectCategory(category.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.slug
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
