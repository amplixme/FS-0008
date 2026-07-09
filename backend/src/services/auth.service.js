import bcrypt from "bcrypt";
import prisma from "../prisma.client.js";

const createUser = async (userData) => {
  const { name, email, password } = userData;

  // Validar si el usuario ya existe, evita la operacion costosa de bcrypt y depender del P2002 de Prisma
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error("Ya existe un usuario con ese correo electrónico");
    error.status = 409;
    throw error;
  }

  // Hashear password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Crear usuario
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
};

export default { createUser };
