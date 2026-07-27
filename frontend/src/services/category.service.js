import api from "./api";

export async function getAll() {
  const response = await api.get("/categories");
  return response;
}

export async function getById(id) {
  const response = await api.get(`/categories/${id}`);
  return response;
}

export async function create(data) {
  const response = await api.post("/categories", data);
  return response;
}

export async function update(id, data) {
  const response = await api.put(`/categories/${id}`, data);
  return response;
}

export async function remove(id) {
  const response = await api.delete(`/categories/${id}`);
  return response;
}
