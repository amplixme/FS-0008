import api from "./api";

export async function getByPostId(postId) {
  const response = await api.get(`/posts/${postId}/comments`);
  return response;
}

export async function create(postId, data) {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return response;
}

export async function update(id, data) {
  const response = await api.put(`/comments/${id}`, data);
  return response;
}

export async function remove(id) {
  const response = await api.delete(`/comments/${id}`);
  return response;
}

//delete es una palabra reservada en JS
export { remove as delete };
