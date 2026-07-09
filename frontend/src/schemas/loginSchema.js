import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .email("Ingresa un email válido"),

  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
