import { z } from "zod";

export const postSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio"),
  content: z.string().trim().min(1, "El contenido es obligatorio"),

  // Esta propiedad se añade para utilizarla cuando se implemente la funcionalidad del toggle
  //published: z.boolean(),
});
