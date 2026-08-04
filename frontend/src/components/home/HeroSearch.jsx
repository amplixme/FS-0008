import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "../../hooks/useDebounce";

function HeroSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInUrl = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchInUrl);
  const [prevSearchInUrl, setPrevSearchInUrl] = useState(searchInUrl);

  // Sincronizacion durante el renderizado si la URL cambia por navegacion externa
  if (prevSearchInUrl !== searchInUrl) {
    setPrevSearchInUrl(searchInUrl);
    setSearchTerm(searchInUrl);
  }

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Sincroniza la busqueda debounced hacia la URL
  useEffect(() => {
    const cleanSearch = debouncedSearch.trim();

    if (cleanSearch === searchInUrl) return;

    const nextParams = new URLSearchParams(searchParams);
    if (cleanSearch) {
      nextParams.set("search", cleanSearch);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  }, [debouncedSearch, searchInUrl, searchParams, setSearchParams]);

  const handleClear = () => {
    setSearchTerm("");
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
  };

  return (
    <section className="mb-16">
      <div className="relative p-12 rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 to-primary-container/10">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-extrabold text-on-surface mb-6 tight-tracking leading-tight">
            Últimas publicaciones
          </h1>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-outline/50 text-on-surface"
              placeholder="Buscar artículos..."
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 p-1 rounded-full hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors flex items-center justify-center"
                aria-label="Limpiar búsqueda"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
