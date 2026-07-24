export default function CategoryTable({ categories, isLoading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200 text-xs font-bold text-gray-500 uppercase">
            <th className="py-4 px-6">ID</th>
            <th className="py-4 px-6">Nombre</th>
            <th className="py-4 px-6">Slug</th>
            <th className="py-4 px-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan="4" className="py-12 text-center text-gray-500">
                Cargando categorías...
              </td>
            </tr>
          ) : categories?.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-500">
                No hay categorías registradas.
              </td>
            </tr>
          ) : (
            categories?.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-400 font-mono">
                  {category.id}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {category.slug}
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="px-4 py-1.5 mr-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-gray-300">
                    Editar
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
