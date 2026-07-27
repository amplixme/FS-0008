import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug solo debe contener letras minúsculas, números y guiones",
    ),
});
