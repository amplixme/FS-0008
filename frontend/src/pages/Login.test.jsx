import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import Login from "./Login";
import { loginUser } from "../services/auth.service";

// Mock de react-router manteniendonos en MemoryRouter
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del hook de autenticación
const mockLoginContext = vi.fn();
vi.mock("../hooks/useAuth", () => ({
  default: () => ({
    login: mockLoginContext,
  }),
}));

// Mock del servicio de autenticacion (API)
vi.mock("../services/auth.service", () => ({
  loginUser: vi.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("muestra errores de validación de Zod si se envía el formulario vacío", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /iniciar sesion/i,
    });
    fireEvent.click(submitButton);

    // findByText es asíncrono, se usa para esperar a que Zod ejecute la validacion
    const emailError = await screen.findByText("El email es obligatorio");
    expect(emailError).toBeInTheDocument();

    // Para el segundo error ya podemos usar getByText porque la re-renderización ya ocurrio
    const passwordError = screen.getByText(
      "La contraseña debe tener al menos 8 caracteres",
    );
    expect(passwordError).toBeInTheDocument();

    // Aseguramos que la API nunca se ejecuto
    expect(loginUser).not.toHaveBeenCalled();
  });

  it("ejecuta la autenticación y navega al home cuando el formulario es válido", async () => {
    const mockUserResponse = {
      token: "fake-jwt-token",
      user: { id: "1", name: "Usuario Prueba" },
    };
    loginUser.mockResolvedValueOnce(mockUserResponse);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText(/correo electronico/i);
    // Usamos regex estricta /^contraseña$/i para no coincidir con aria-label="Mostrar contraseña"
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesion/i,
    });

    // Simulamos las interacciones con fireEvent
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Verificamos que la API recibio los datos del formulario
      expect(loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      // Verificamos la actualizacion del contexto y la navegacion
      expect(mockLoginContext).toHaveBeenCalledWith(
        "fake-jwt-token",
        mockUserResponse.user,
      );

      expect(mockNavigate).toHaveBeenCalledWith("/", {
        state: { successMessage: "Sesion iniciada correctamente." },
      });
    });
  });

  it("muestra la alerta de error del servidor si la petición falla", async () => {
    loginUser.mockRejectedValueOnce(new Error("Credenciales inválidas"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText(/correo electronico/i);
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesion/i,
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Verificamos que se llame la API
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledTimes(1);
    });

    // Esperamos a que el estado serverError se actualice y renderice el texto
    const errorMessage = await screen.findByText(/Credenciales inválidas/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
