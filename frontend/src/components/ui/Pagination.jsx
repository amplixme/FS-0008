import { useSearchParams } from "react-router";

export default function Pagination({ totalPages = 1 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Obtenemos la página actual de la URL (por defecto 1)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage.toString());
      return params;
    });

    // Desplazamiento suave hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generar array dinámico de números de página basado en el total real
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-16 flex justify-center items-center gap-2" aria-label="Navegación de páginas">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-outline hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Números de página dinámicos */}
      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-md"
                  : "text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-outline hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Página siguiente"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
}