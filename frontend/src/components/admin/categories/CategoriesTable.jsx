import EmptyState from "../../common/EmptyState";
import Spinner from "../../common/Spinner";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import CategorySearchIcon from "~icons/material-symbols/category-search";

export function CategoriesTable({
  data = [],
  isLoading = false,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
      {/* Header del bloque */}
      <div className="flex flex-col lg:flex-row items-start lg:justify-between p-6 border-b border-slate-100 gap-2">
        <div className="flex flex-row items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Categorías</h1>
          <span className="bg-blue-100 text-blue-700 py-0.5 px-3 rounded-full text-sm font-semibold">
            {isLoading ? "..." : data.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onCreate}
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          + Crear categoría
        </button>
      </div>

      {/* Contenido condicional dentro de la tarjeta */}
      {isLoading ? (
        <Spinner icon={ProgressActivityIcon} message="Cargando categorías..." />
      ) : data.length === 0 ? (
        <EmptyState
          icon={CategorySearchIcon}
          message="No se encontraron categorías. Crea una para comenzar."
        />
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-x-scroll lg:overflow-hidden md:overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Nombre</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-6 text-sm text-slate-400 font-mono">
                    {category.id}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">
                    {category.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {category.slug || "-"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      className="px-4 py-1.5 mr-3 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors inline-flex items-center justify-center align-middle"
                      title="Eliminar categoría"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
