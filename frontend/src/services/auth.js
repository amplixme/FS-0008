import api from "./api";

// Modificar a false cuando el backend de auth este disponible
const MOCK_MODE = true;

const MOCK_REGISTERED_EMAILS = ["juan@ejemplo.com"];

function mockRegister({ name, email, password}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_REGISTERED_EMAILS.includes(email)) {
        reject({
          response: {
            status: 409,
            data: { error: { message: "El email ya esta registrado", status: 409 } },
          },
        });
        return;
      }
      resolve({ data: { data: { id: 1, name, email } } });
    }, 1000);
  });
}

export async function registerUser({ name, email, password }) {
  if (MOCK_MODE) {
    return mockRegister({ name, email, password });
  }

  return api.post("/auth/register", { name, email, password });
}