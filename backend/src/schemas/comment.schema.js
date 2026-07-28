import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string({
      required_error: "El contenido es obligatorio",
    })
    .min(1, "El contenido no puede estar vacío"),
});

export const updateCommentSchema = createCommentSchema;
