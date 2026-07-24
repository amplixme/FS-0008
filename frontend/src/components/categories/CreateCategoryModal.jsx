import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "../../services/category.service";
import { categorySchema } from "../../schemas/categorySchema";

export function CreateCategoryModal({ onClose, onSuccess }) {
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (formData) => {
    setServerError(null);

    try {
      await create(formData);
      onSuccess(); // Triggerea refetch() en el componente padre
      onClose(); // Cierra el modal
    } catch (err) {
      // Errores del backend
      setServerError(err.message || "Error al crear la categoría.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600 text-2xl">
            add_circle
          </span>
          Crear Categoría
        </h2>

        {/* Banner de error del servidor */}
        {serverError && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Nombre
            </label>
            <input
              id="name"
              {...register("name")}
              disabled={isSubmitting}
              placeholder="Ej. Programación"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors disabled:bg-gray-50 disabled:opacity-50"
            />
            {errors.name && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Slug
            </label>
            <input
              id="slug"
              {...register("slug")}
              disabled={isSubmitting}
              placeholder="Ej. programacion"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors disabled:bg-gray-50 disabled:opacity-50"
            />
            {errors.slug && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-full font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
