import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(80, "El nombre no puede superar los 80 caracteres"),

  bio: z
    .string()
    .trim()
    .max(200, "La biografía no puede superar los 200 caracteres")
    .optional()
    .or(z.literal("")),

  avatarUrl: z
    .string()
    .trim()
    .url("La URL del avatar no es válida")
    .optional()
    .or(z.literal("")),
});
