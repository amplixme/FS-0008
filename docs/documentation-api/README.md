# API — FS-0008

Documentación de los endpoints de la API. <br/>
Organizada por recurso, un archivo por módulo.

## Índice

- [Auth](./auth/auth.md)
- [Posts](./posts/posts.md)
- [Admin](./admin/admin.md)
- [User](./user/user.md)
- [Categories](./categories/categories.md)
- [Comments](./comments/comments.md)
- [Upload](./upload/upload.md)

## Autenticación

Los endpoints protegidos requieren un JWT enviado en el header `Authorization`:

```
Authorization: Bearer <token>
```

El token se obtiene desde `POST /auth/login`. Cada endpoint documentado indica si requiere auth y, si aplica, qué rol.

## Formato de respuesta

Todas las respuestas exitosas siguen este formato:

```json
{
  "success": true,
  "data": { ... }
}
```

## Códigos de error comunes

| Código | Significado | Cuándo aparece |
|--------|-------------|-----------------|
| `400` | Bad Request | Body/params no pasan la validación (Zod) |
| `401` | Unauthorized | Falta el token, es inválido o expiró |
| `403` | Forbidden | Token válido pero sin permisos para la acción (rol insuficiente) |
| `404` | Not Found | El recurso solicitado no existe |
| `409` | Conflict | Conflicto con el estado actual del recurso (ej: email ya registrado) |

Formato de respuesta de error:

```json
{
  "success": false,
  "message": "Descripción del error"
}
```
