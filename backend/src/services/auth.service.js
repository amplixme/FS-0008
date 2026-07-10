import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import prisma from "../prisma.client.js";

// Hash dummy para comparar tiempos cuando el usuario no existe (evita timing attack de enumeracion de emails)
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Q5S9YvUdmZ1oQ6oJv1Fzs.G1u3l3W";

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

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  // Siempre corremos bcrypt.compare, exista o no el usuario, para no filtrar por tiempo de respuesta si el email esta registrado o no.
  const passwordMatches = await bcrypt.compare(password, user ? user.password : DUMMY_HASH);

  if (!user || !passwordMatches) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    token,
    user: { id: user.id, email: user.email, name: user.name },
  };
};

export default { createUser, loginUser };
