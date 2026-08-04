import api from "./api";

export async function getProfile(id) {
  return api.get(`/users/${id}`);
}

export async function updateProfile(data) {
  return api.put("/users/me", data);
}