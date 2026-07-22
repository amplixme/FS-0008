import api from "./api";

export async function getAll(params = {}, config = {}) {
  const response = await api.get(`/posts${params}`, { ...config }); // Agregar configuracion para manejar la señal de cancelación
  return response;
}

export async function getById(id) {
  const response = await api.get(`/posts/${id}`);
  return response;
}

export async function create(data) {
  const response = await api.post("/posts", data);
  return response;
}

export async function update(id, data) {
  const response = await api.put(`/posts/${id}`, data);
  return response;
}

export async function remove(id) {
  const response = await api.delete(`/posts/${id}`);
  return response;
}
// delete es una palabra reservada en JS, por eso se define como remove y se exporta como delete
export { remove as delete };
