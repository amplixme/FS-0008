import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import Login from "./Login";
import { loginUser } from "../services/auth.service";

// Mock de react-router
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del hook de autenticacion
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

  it("muestra la alerta de exito si viene un mensaje en location.state", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/login",
            state: {
              successMessage:
                "Cuenta creada correctamente. Ahora podes iniciar sesion.",
            },
          },
        ]}
      >
        <Login />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        "Cuenta creada correctamente. Ahora podes iniciar sesion.",
      ),
    ).toBeInTheDocument();
  });

  it("alterna la visibilidad de la contraseña al pulsar el boton correspondiente", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const toggleButton = screen.getByRole("button", {
      name: /mostrar contraseña/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("muestra errores de validacion de Zod si se envía el formulario vacio", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /iniciar sesion/i,
    });
    fireEvent.click(submitButton);

    const emailError = await screen.findByText("El email es obligatorio");
    const passwordError = screen.getByText(
      "La contraseña debe tener al menos 8 caracteres",
    );

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(loginUser).not.toHaveBeenCalled();
  });

  it("ejecuta la autenticacion y navega al home cuando el formulario es valido", async () => {
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
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesion/i,
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      expect(mockLoginContext).toHaveBeenCalledWith(
        "fake-jwt-token",
        mockUserResponse.user,
      );

      expect(mockNavigate).toHaveBeenCalledWith("/", {
        state: { successMessage: "Sesion iniciada correctamente." },
      });
    });
  });

  it("muestra la alerta de error del servidor si la peticion falla", async () => {
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

    const errorMessage = await screen.findByText(/Credenciales inválidas/i);
    expect(errorMessage).toBeInTheDocument();
    expect(loginUser).toHaveBeenCalledTimes(1);
  });
});
