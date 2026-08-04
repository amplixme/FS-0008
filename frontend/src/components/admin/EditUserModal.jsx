import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAdminUserSchema } from "../../schemas/adminUserSchema";
import { updateUser } from "../../services/admin.service";

function EditUserModal({ user, onClose, onSuccess }) {
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editAdminUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "USER",
    },
  });

  const onSubmit = async (formData) => {
    setServerError(null);

    try {
      await updateUser(user.id, formData);
      onSuccess();
      onClose();
    } catch (err) {
      setServerError(err.message || "Error al actualizar el usuario.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-surface-variant/30">
          <h2 className="text-xl font-bold text-on-surface">
            Editar usuario
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Modal Body */}
          <div className="p-8 space-y-6">
            {serverError && (
              <div className="p-4 rounded-xl bg-error-container text-on-error-container text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  error
                </span>
                {serverError}
              </div>
            )}

            <div>
              <label
                htmlFor="edit-name"
                className="block text-xs font-bold text-outline uppercase tracking-widest mb-2"
              >
                Nombre completo
              </label>
              <input
                id="edit-name"
                {...register("name")}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
              />
              {errors.name && (
                <p className="text-xs text-error font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-email"
                className="block text-xs font-bold text-outline uppercase tracking-widest mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="edit-email"
                type="email"
                {...register("email")}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
              />
              {errors.email && (
                <p className="text-xs text-error font-medium mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-role"
                className="block text-xs font-bold text-outline uppercase tracking-widest mb-2"
              >
                Rol
              </label>
              <select
                id="edit-role"
                {...register("role")}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {errors.role && (
                <p className="text-xs text-error font-medium mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-8 py-6 bg-surface-container-low flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full text-on-surface-variant font-semibold border-2 border-surface-variant hover:bg-surface-container transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold shadow-md hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
