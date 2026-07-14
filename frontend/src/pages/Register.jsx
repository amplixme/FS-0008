import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../services/auth.service";
import { registerSchema } from "../schemas/registerSchema";
import Alert from "../components/ui/Alert";

function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    setServerError(null);
    try {
      await registerUser(formData);
      navigate("/login", {
        state: {
          successMessage:
            "Cuenta creada correctamente. Ahora podes iniciar sesion.",
        },
      });
    } catch (err) {
      const message = err.message;
      setServerError(message);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-10 bg-surface">
      <h1 className="text-2xl font-bold tracking-tight text-on-surface mt-20">
        TuProyecto
      </h1>

      <section className="w-full max-w-[420px] mx-auto mt-12 mb-0 bg-white md:rounded-xl shadow-xl overflow-hidden flex flex-col">
        <header className="px-8 pt-10 pb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Crear cuenta
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm">
            Únete a la comunidad
          </p>
        </header>

        <form
          className="px-8 pb-10 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-on-surface-variant ml-1"
            >
              Nombre completo
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl"
              >
                person
              </span>
              <input
                id="name"
                type="text"
                placeholder="Ej. Juan Perez"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-xs text-error ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-on-surface-variant ml-1"
            >
              Correo electronico
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl"
              >
                mail
              </span>
              <input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs text-error ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-on-surface-variant ml-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl"
              >
                lock
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs text-error ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-on-surface-variant ml-1"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl"
              >
                enhanced_encryption
              </span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="text-xs text-error ml-1"
              >
                {errors.confirmPassword.message}
              </p>
            )}

            {serverError && (
              <div className="mt-5">
                <Alert message={serverError} type="error" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <footer className="bg-surface-container-low py-6 px-8 text-center border-t border-outline-variant/40">
          <p className="text-sm text-on-surface-variant">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Inicia sesion
            </Link>
          </p>
        </footer>
      </section>
    </div>
  );
}

export default Register;
