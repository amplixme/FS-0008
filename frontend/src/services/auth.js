import api from "./api";

export async function loginUser({ email, password }) {
  return api.post("/auth/login", { email, password });
}
