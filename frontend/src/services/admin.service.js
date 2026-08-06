import api from "./api";

export async function getStats() {
  return await api.get("/admin/stats");
}

export async function getUsers() {
  return await api.get("/admin/users");
}

export async function createUser(data) {
  return await api.post("/admin/users", data);
}

export async function updateUser(id, data) {
  return await api.patch(`/admin/users/${id}`, data);
}

export async function changeUserRole(id, role) {
  return await api.patch(`/admin/users/${id}/role`, { role });
}

export async function deleteUser(id) {
  return await api.delete(`/admin/users/${id}`);
}

export async function deletePost(id) {
  return await api.delete(`/admin/posts/${id}`);
}

export async function getRecentComments() {
  return await api.get("/admin/comments");
}

export async function deleteComment(id) {
  return await api.delete(`/admin/comments/${id}`);
}
