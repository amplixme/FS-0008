import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
    })
    .min(1, "El nombre no puede estar vacío"),

  slug: z
    .string({
      required_error: "El slug es obligatorio",
    })
    .min(1, "El slug no puede estar vacío"),
});

export const updateCategorySchema = createCategorySchema.partial();

