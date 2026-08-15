import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAdminUserSchema } from "../../../schemas/adminUserSchema";
import { updateUser } from "../../../services/admin.service";
import CloseIcon from "~icons/material-symbols/close";
import ErrorIcon from "~icons/material-symbols/error-outline";
import { useModalKeyboard } from "../../../hooks/useModalKeyboard";

function EditUserModal({ user, onClose, onSuccess }) {
  const [serverError, setServerError] = useState(null);
  const modalRef = useModalKeyboard(onClose);

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
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-user-modal-title"
        tabIndex={-1}
        className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-surface-variant/30">
          <h2
            id="edit-user-modal-title"
            className="text-xl font-bold text-on-surface"
          >
            Editar usuario
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors"
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Modal Body */}
          <div className="p-8 space-y-6">
            {serverError && (
              <div className="p-4 rounded-xl bg-error-container text-on-error-container text-sm font-medium flex items-center gap-2">
                <ErrorIcon className="text-lg" aria-hidden="true" />
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
          <div className="px-4 py-6 sm:px-8 bg-surface-container-low flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-on-surface-variant font-semibold border-2 border-surface-variant hover:bg-surface-container transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold shadow-md hover:opacity-90 transition-all disabled:opacity-50"
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
