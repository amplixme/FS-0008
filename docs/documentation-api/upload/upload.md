# Upload

Subida de imágenes a Cloudinary (usadas como `coverImage` de posts o `avatarUrl` de perfil).

Base path: `/api/upload`

---

## `POST /api/upload`

Sube una imagen y devuelve su URL pública en Cloudinary.

**Auth requerida:** Sí

### Body

`multipart/form-data` con un único campo de archivo:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `image` | file | Sí | Archivo de imagen (campo procesado por `uploadMiddleware.single("image")`) |

**Restricciones (`multer`, memoria, sin escribir a disco):**

- Tipos permitidos: `image/jpeg`, `image/png`, `image/webp`
- Tamaño máximo: `5MB`

### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/tu-cloud/image/upload/v.../archivo.jpg"
  }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `400` | No se envió ningún archivo en el campo `image` |
| `400` | Tipo de archivo no permitido (solo JPG, PNG o WEBP) |
| `400` | El archivo supera los 5MB |
| `401` | Token faltante, inválido o expirado |
