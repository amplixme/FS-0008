import { z } from "zod";

export const createAdminUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Selecciona un rol",
  }),
});

export const editAdminUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido"),
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Selecciona un rol",
  }),
});
