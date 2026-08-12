import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "../../hooks/useDebounce";

function HeroSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(urlSearch);

  // Registro del ultimo valor de la URL que vimos (para evitar re-render innecesarios)
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);

  // Si la URL cambia externamente (ej. boton Atras), actualizamos el estado inmediatamente.
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setInputValue(urlSearch);
  }

  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedSearch === urlSearch) {
      return;
    }

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        } else {
          // Si el input esta vacío, elimina la key para no dejar "?search=" en la URL
          params.delete("search");
        }

        // Para evitar bugs de paginacion donde al cambiar el search, la pagina se queda en 2, 3, etc. y no vuelve a la 1
        params.delete("page");
        return params;
      },
      { replace: true }, // Evita llenar el historial de navegacion en cada cambio
    );
  }, [debouncedSearch, setSearchParams, urlSearch]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <section className="mb-16">
      <div className="relative lg:p-12 p-6 rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 to-primary-container/10">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-on-surface mb-6 tight-tracking leading-tight">
            Últimas publicaciones
          </h1>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-outline/50 text-on-surface"
              placeholder="Buscar artículos..."
            />
            {inputValue && (
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
