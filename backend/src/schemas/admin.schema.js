import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Formato de email inválido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Formato de email inválido"),
    role: z.enum(["USER", "ADMIN"]),
  })
  .partial();

export const changeRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"], {
    required_error: "El rol es obligatorio",
    invalid_type_error: "El rol debe ser USER o ADMIN",
  }),
});
