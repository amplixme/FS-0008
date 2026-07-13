import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de request:
// Si existe el token lo agrega como Authorization: Bearer <token>
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de response:
// Si el backend responde 401, limpia sesion y redirige a login
api.interceptors.response.use(
  (response) => {
    // retornar directamente los datos exitosos.
    return response.data.data;
  },
  (error) => {
    // si la peticion iba dirigida al endpoint de login, no hacemos la recarga
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // extraer el mensaje de error estandarizado del backend
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      "Ocurrio un error en la solicitud.";
    return Promise.reject(new Error(message));
  },
);

export default api;
