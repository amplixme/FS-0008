import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio"),

    email: z
      .string()
      .trim()
      .min(1, "El email es obligatorio")
      .email("Ingresa un email válido"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),

    confirmPassword: z
      .string()
      .min(1, "Confirma tu contraseña"),
  })
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Las contraseñas no coinciden",
    }
  );
	