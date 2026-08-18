import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import SearchIcon from "~icons/material-symbols/search";
import CloseIcon from "~icons/material-symbols/close";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchInput({
  id = "search-input",
  placeholder = "Buscar artículos...",
  autoFocus = false,
  className = "",
  inputClassName = "py-4 text-lg",
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const inputRef = useRef(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Sincronización cuando cambia la URL
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setInputValue(urlSearch);
  }

  const debouncedSearch = useDebounce(inputValue, 300);

  // Auto-focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Si esta fuera del home, redirige a home con el query de busqueda
  useEffect(() => {
    if (pathname !== "/") {
      if (debouncedSearch) {
        navigate(`/?search=${encodeURIComponent(debouncedSearch)}`);
      }
      return;
    }

    setSearchParams(
      (prev) => {
        const currentSearchInUrl = prev.get("search") || "";

        if (currentSearchInUrl === debouncedSearch) {
          return prev;
        }

        const params = new URLSearchParams(prev);
        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        } else {
          params.delete("search");
        }
        params.delete("page");
        return params;
      },
      { replace: true },
    );
  }, [debouncedSearch, pathname, navigate, setSearchParams, id]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <SearchIcon
        className="absolute left-4 text-outline pointer-events-none"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={`w-full pl-12 pr-12 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50 text-on-surface ${inputClassName}`}
        placeholder={placeholder}
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 p-1 rounded-full hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors flex items-center justify-center"
          aria-label="Limpiar búsqueda"
        >
          <CloseIcon className="text-xl" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
