import bcrypt from "bcrypt";
import prisma from "../prisma.client.js";

// ─────────────────────────────────────────────
// Perfil público / propio del usuario
// ─────────────────────────────────────────────

export const getPublicProfile = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      bio: true,
      avatarUrl: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    postsCount: user._count.posts,
  };
};

export const updateProfile = async (userId, data) => {
  const { name, bio, avatarUrl } = data;

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      bio,
      avatarUrl,
    },
    select: {
      id: true,
      name: true,
      bio: true,
      avatarUrl: true,
    },
  });
};

// ─────────────────────────────────────────────
// Operaciones de administración sobre usuarios
// ─────────────────────────────────────────────

// GET /api/admin/users
export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { posts: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    postsCount: user._count.posts,
  }));
};

// POST /api/admin/users
export const createUser = async ({ name, email, password, role }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error("Ya existe un usuario con ese correo electrónico");
    error.status = 409;
    throw error;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// PATCH /api/admin/users/:id/role
export const changeUserRole = async (targetUserId, role, requestingUserId) => {
  const targetId = Number(targetUserId);

  if (targetId === requestingUserId) {
    const error = new Error("No podés cambiar tu propio rol");
    error.status = 403;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: targetId },
  });

  if (!existingUser) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  return await prisma.user.update({
    where: { id: targetId },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// PATCH /api/admin/users/:id
export const updateUser = async (targetUserId, data) => {
  const targetId = Number(targetUserId);

  const existingUser = await prisma.user.findUnique({
    where: { id: targetId },
  });

  if (!existingUser) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  if (data.email && data.email !== existingUser.email) {
    const emailTaken = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailTaken) {
      const error = new Error(
        "Ya existe un usuario con ese correo electrónico",
      );
      error.status = 409;
      throw error;
    }
  }

  return await prisma.user.update({
    where: { id: targetId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.role !== undefined && { role: data.role }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// DELETE /api/admin/users/:id
export const deleteUser = async (targetUserId, requestingUserId) => {
  const targetId = Number(targetUserId);

  if (targetId === requestingUserId) {
    const error = new Error("No podés eliminarte a vos mismo");
    error.status = 403;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: targetId },
  });

  if (!existingUser) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  // Eliminación en cascada manual (el schema no tiene onDelete: Cascade desde Post/Comment hacia User)
  // 1) Se eliminan los comentarios del usuario.
  // 2) Se eliminan sus posts (los comentarios de esos posts se eliminan automáticamente por la FK).
  // 3) Finalmente, se elimina el usuario.
  await prisma.$transaction([
    prisma.comment.deleteMany({ where: { authorId: targetId } }),
    prisma.post.deleteMany({ where: { authorId: targetId } }),
    prisma.user.delete({ where: { id: targetId } }),
  ]);

  return { message: "Usuario eliminado correctamente" };
};
