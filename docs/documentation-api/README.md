# API — FS-0008 (Blog)

Documentación completa de los endpoints de la API. Organizada por recurso, una carpeta por módulo con su propio `README.md`.

## Índice

| Módulo | Descripción |
|--------|-------------|
| [Auth](./auth/auth.md) | Registro, login y sesión |
| [Posts](./posts/posts.md) | CRUD de posts del blog |
| [Comments](./comments/comments.md) | Comentarios sobre posts |
| [Categories](./categories/categories.md) | Categorías de posts |
| [Users](./users/users.md) | Perfil público y edición de perfil propio |
| [Admin](./admin/admin.md) | Panel de administración (gestión de usuarios, posts, comentarios y stats) |
| [Upload](./upload/upload.md) | Subida de imágenes (Cloudinary) |

> Base path: todas las rutas de este índice están montadas bajo `/api` (ej: `/api/auth/login`, `/api/posts`). Además existe `GET /api/health` como health check, sin lógica ni auth asociada.

## Autenticación

Los endpoints protegidos requieren un JWT enviado en el header `Authorization`:

```
Authorization: Bearer <token>
```

El token se obtiene desde `POST /api/auth/login` y expira a las **24hs**. `authMiddleware` lo verifica, y arma `req.user` a partir del payload decodificado (el JWT firma `userId`, pero `authMiddleware` lo remapea a `id`):

```json
{
  "id": 1,
  "email": "hernan@example.com",
  "name": "Hernán Coronel",
  "role": "USER"
}
```

## Roles

Existen dos roles: `USER` (por defecto al registrarse) y `ADMIN`. Los endpoints que requieren rol `ADMIN` encadenan `authMiddleware` (verifica el token) y luego `requireRole("ADMIN")` (verifica el rol, case-insensitive). Si falta o es inválido el token, responde `401`; si el token es válido pero el rol no alcanza, responde `403`.

## Formato de respuesta

Respuestas exitosas:

```json
{
  "data": { ... }
}
```

Los endpoints con paginación (ej. `GET /posts`) agregan un campo `meta` adicional:

```json
{
  "data": [ ... ],
  "meta": { "total": 42, "page": 1, "limit": 10, "totalPages": 5 }
}
```

Respuestas de error:

```json
{
  "message": "Descripción del error"
}
```

## Códigos de error comunes

| Código | Significado | Cuándo aparece |
|--------|-------------|-----------------|
| `400` | Bad Request | Body/params no pasan la validación (Zod), o falta un archivo requerido |
| `401` | Unauthorized | Falta el token, es inválido o expiró |
| `403` | Forbidden | Token válido pero sin permisos para la acción (rol insuficiente o no es el dueño del recurso) |
| `404` | Not Found | El recurso solicitado no existe |
| `409` | Conflict | Conflicto con el estado actual del recurso (ej: email ya registrado, categoría con posts asociados) |

### Sobre el error handler global

`errorHandler` (middleware de errores, al final de la cadena) traduce automáticamente algunos errores que no se manejan a mano en el service/controller:

- **Prisma `P2002`** (constraint `unique` violado) → `409`, con mensaje `"Ya existe un registro con ese <campo>"`.
- **Prisma `P2025`** (registro no encontrado, ej. al hacer `update`/`delete`/`connect` sobre un `id` inexistente) → `404`, con mensaje genérico `"Recurso no encontrado"`.
- **Errores de `multer`** (o `err.code === "INVALID_FILE_TYPE"`) → `400`, con el mensaje propio del error.
- Cualquier otro error usa `err.status` (o `500` si no tiene) y `err.message`.

Esto importa porque algunos endpoints (ver notas puntuales en `categories` y `admin`) no chequean a mano si el recurso existe antes de operar sobre él — el `404`/`409` que devuelven en esos casos viene de acá, no de una validación explícita, así que el mensaje es genérico en vez de uno específico del dominio.

También, los errores de validación de body (Zod, vía `validate.middleware.js`) siempre devuelven `400` con `message: "Validation failed"` — el detalle campo por campo (`error.errors` de Zod) se adjunta como `details` en el objeto de error, pero si eso se expone o no en la response depende de la implementación de `utils/response.js` (no incluida en el material recibido).
