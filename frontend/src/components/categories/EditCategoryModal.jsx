import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { update } from "../../services/category.service";
import { categorySchema } from "../../schemas/categorySchema";

export function EditCategoryModal({ category, onClose, onSuccess }) {
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
    },
  });

  const onSubmit = async (formData) => {
    setServerError(null);

    try {
      await update(category.id, formData);
      onSuccess(); // Triggerea refetch() en el componente padre
      onClose(); // Cierra el modal
    } catch (err) {
      // Errores del backend
      setServerError(err.message || "Error al actualizar la categoría.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="title-md font-bold text-slate-900">
            Editar categoría
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Modal Body */}
          <div className="p-8 space-y-6">
            {serverError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {serverError}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block label-md text-slate-500 uppercase tracking-widest mb-2"
              >
                Nombre
              </label>
              <input
                id="name"
                {...register("name")}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 disabled:opacity-50"
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
                className="block label-md text-slate-500 uppercase tracking-widest mb-2"
              >
                Slug
              </label>
              <input
                id="slug"
                {...register("slug")}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 disabled:opacity-50"
              />
              {errors.slug && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-8 py-6 bg-slate-50 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full text-slate-600 font-semibold border-2 border-slate-200 hover:bg-slate-100 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar categoría"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
