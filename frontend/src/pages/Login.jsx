import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { loginSchema } from "../schemas/loginSchema";
import { loginUser } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setServerError(null);
    try {
      const response = await loginUser(formData);
      const token = response.data.token;
      const userData = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/", {
        state: {
          successMessage: "Sesion iniciada correctamente.",
        },
      });
    } catch (err) {
      const message =
        err.response?.data?.error?.message ??
        "Ocurrio un error al iniciar sesion. Intenta nuevamente.";
      setServerError(message);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-10 bg-surface">
      <h1 className="text-2xl font-bold tracking-tight text-on-surface mt-20">
        TuProyecto
      </h1>

      <section className="w-full max-w-105 mx-auto mt-12 mb-0 bg-white md:rounded-xl shadow-xl overflow-hidden flex flex-col">
        <header className="px-8 pt-10 pb-12 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Iniciar sesion
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm">
            Ingresa a tu cuenta para continuar
          </p>
        </header>

        <form
          className="px-8 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
                className="w-full pl-10 pr-4 py-3"
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
            <div className="flex justify-between text-sm font-medium">
              <label
                htmlFor="password"
                className=" text-on-surface-variant ml-1"
              >
                Contraseña
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors"
              >
                Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl"
              >
                lock
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
              />
              <button
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs text-error ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p
              role="alert"
              aria-live="polite"
              className="text-sm text-error bg-error-container/50 rounded-xl px-3 py-2"
            >
              {serverError}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
          </button>
        </form>

        <div className="px-8 mb-6">
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-outline-variant/40"></div>
            <span className="text-sm font-medium text-outline-variant">o</span>
            <div className="flex-1 border-t border-outline-variant/40"></div>
          </div>

          <Link
            to="/auth/google"
            className="w-full py-4 active:scale-[0.98] transition-all flex items-center justify-center gap-3 px-6 bg-surface-container-low border border-outline-variant/10 rounded-full hover:bg-surface-container-high text-on-surface font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </Link>
        </div>

        <footer className="bg-surface-container-low py-6 px-8 text-center border-t border-outline-variant/40">
          <p className="text-sm text-on-surface-variant">
            ¿No tienes cuenta?
            <Link
              to="/register"
              className="ml-1 text-primary font-bold hover:underline"
            >
              Registrate
            </Link>
          </p>
        </footer>
      </section>
    </div>
  );
}
