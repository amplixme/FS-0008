import { useCategories } from "../../hooks/useCategories";
import CategoryTable from "../../components/categories/CategoriesTable";

export default function CategoriesPage() {
  const { categories, isLoading } = useCategories();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 pt-24">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
            <span className="bg-blue-100 text-blue-700 py-0.5 px-3 rounded-full text-sm font-semibold">
              {categories?.length || 0}
            </span>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700">
            + Crear categoría
          </button>
        </div>

        <CategoryTable categories={categories} isLoading={isLoading} />
      </div>
    </div>
  );
}
