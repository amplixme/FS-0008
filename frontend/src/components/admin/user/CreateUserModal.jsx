import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminUserSchema } from "../../../schemas/adminUserSchema";
import { createUser } from "../../../services/admin.service";
import CloseIcon from "~icons/material-symbols/close";
import ErrorIcon from "~icons/material-symbols/error-outline";

function RoleRadioOption({ id, value, label, register }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer select-none"
    >
      <input
        id={id}
        type="radio"
        value={value}
        {...register("role")}
        className="w-5 h-5 accent-primary cursor-pointer"
      />
      <span className="font-medium text-on-surface">{label}</span>
    </label>
  );
}

function CreateUserModal({ onClose, onSuccess }) {
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAdminUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (formData) => {
    setServerError(null);

    try {
      await createUser(formData);
      onSuccess();
      onClose();
    } catch (err) {
      setServerError(err.message || "Error al crear el usuario.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-surface-variant/30">
          <h2 className="text-xl font-bold text-on-surface">
            Crear nuevo usuario
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
                htmlFor="name"
                className="block text-xs font-bold text-outline uppercase tracking-widest mb-2"
              >
                Nombre completo
              </label>
              <input
                id="name"
                {...register("name")}
                disabled={isSubmitting}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline disabled:opacity-50"
              />
              {errors.name && (
                <p className="text-xs text-error font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-outline uppercase tracking-widest mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                disabled={isSubmitting}
                placeholder="usuario@ejemplo.com"
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline disabled:opacity-50"
              />
              {errors.email && (
                <p className="text-xs text-error font-medium mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-outline uppercase tracking-widest mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                disabled={isSubmitting}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline disabled:opacity-50"
              />
              {errors.password && (
                <p className="text-xs text-error font-medium mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <span className="block text-xs font-bold text-outline uppercase tracking-widest mb-2">
                Selector de rol
              </span>
              <div className="flex items-center gap-8">
                <RoleRadioOption
                  id="role-user"
                  value="USER"
                  label="USER"
                  register={register}
                />
                <RoleRadioOption
                  id="role-admin"
                  value="ADMIN"
                  label="ADMIN"
                  register={register}
                />
              </div>
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
              {isSubmitting ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserModal;
