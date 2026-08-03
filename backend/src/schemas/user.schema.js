import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
    })
    .min(1, "El nombre no puede estar vacío"),

  bio: z
    .string()
    .min(1, "La biografía no puede estar vacía")
    .optional(),

  avatarUrl: z
    .string()
    .url("Debe ser una URL válida")
    .optional(),
});

export const updateProfileSchema = profileSchema.partial();
