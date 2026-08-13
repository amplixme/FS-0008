# Admin

Panel de administración: stats agregadas y gestión de usuarios, posts y comentarios.

Base path: `/api/admin`

**Auth requerida en TODO el módulo:** Sí, rol `ADMIN` (`authMiddleware` + `requireRole("ADMIN")` aplicados a nivel router, antes de cualquier endpoint).

---

## `GET /api/admin/stats`

Devuelve estadísticas agregadas para el dashboard.

### Response `200 OK`

```json
{
  "data": {
    "totalUsers": 25,
    "totalPosts": 42,
    "totalComments": 130,
    "postsByCategory": [
      { "id": "clx1a2b3c", "name": "Backend", "slug": "backend", "postsCount": 18 }
    ]
  }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |

---

## `GET /api/admin/users`

Lista todos los usuarios con la cantidad de posts de cada uno.

### Response `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Hernán Coronel",
      "email": "hernan@example.com",
      "role": "ADMIN",
      "createdAt": "2026-01-10T09:00:00.000Z",
      "postsCount": 5
    }
  ]
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |

---

## `POST /api/admin/users`

Crea un usuario (permite asignar rol directamente, a diferencia de `/api/auth/register`).

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `name` | string | Sí | mínimo 2 caracteres |
| `email` | string | Sí | formato de email válido |
| `password` | string | Sí | mínimo 8 caracteres |
| `role` | string | No | `"USER"` o `"ADMIN"` (default `"USER"`) |

### Response `201 Created`

```json
{
  "data": {
    "id": 26,
    "name": "Nuevo Usuario",
    "email": "nuevo@example.com",
    "role": "USER",
    "createdAt": "2026-08-11T09:00:00.000Z"
  }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido |
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `409` | Ya existe un usuario con ese email |

---

## `PATCH /api/admin/users/:id/role`

Cambia el rol de un usuario. Un admin no puede cambiarse el rol a sí mismo.

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `role` | string | Sí | `"USER"` o `"ADMIN"` |

### Response `200 OK`

Devuelve el usuario actualizado (mismo shape que `POST /api/admin/users`).

### Errores

| Código | Motivo |
|--------|--------|
| `400` | `role` faltante o inválido |
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN`, o intenta cambiar su propio rol |
| `404` | No existe un usuario con ese `id` |

---

## `PATCH /api/admin/users/:id`

Actualiza `name`, `email` y/o `role` de un usuario.

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `name` | string | No | mínimo 2 caracteres |
| `email` | string | No | formato de email válido |
| `role` | string | No | `"USER"` o `"ADMIN"` |

### Response `200 OK`

Devuelve el usuario actualizado.

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido |
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `404` | No existe un usuario con ese `id` |
| `409` | El nuevo `email` ya está en uso por otro usuario |

---

## `DELETE /api/admin/users/:id`

Elimina un usuario. Un admin no puede eliminarse a sí mismo. Borra en cascada (transacción) sus comentarios y posts antes de borrar el usuario.

### Response `200 OK`

```json
{
  "data": { "message": "Usuario eliminado correctamente" }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN`, o intenta eliminarse a sí mismo |
| `404` | No existe un usuario con ese `id` |

---

## `DELETE /api/admin/posts/:id`

Elimina cualquier post (sin chequeo de autoría, a diferencia de `DELETE /api/posts/:id`).

### Response `200 OK`

```json
{
  "data": { "message": "Post eliminado correctamente" }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `404` | No existe un post con ese `id` |

> Nota de implementación: a diferencia del endpoint público (`DELETE /api/posts/:id`), este no chequea a mano si el post existe antes de borrarlo. El `404` sale del error handler global traduciendo `P2025` de Prisma, con mensaje genérico `"Recurso no encontrado"` en vez de `"Post no encontrado"`.

---

## `GET /api/admin/comments`

Lista los comentarios más recientes de todo el blog (no filtra por post), para la sección "Comentarios recientes" del panel.

### Response `200 OK`

```json
{
  "data": [
    {
      "id": "cmt_1",
      "content": "Buen artículo!",
      "createdAt": "2026-08-05T12:00:00.000Z",
      "author": { "id": 1, "name": "Hernán Coronel" },
      "post": { "id": 12, "title": "Cómo armar un README de API" }
    }
  ]
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |

---

## `DELETE /api/admin/comments/:id`

Elimina cualquier comentario (usa la misma lógica que `DELETE /api/comments/:commentId`, con el admin como `user` autenticado).

### Response `200 OK`

```json
{
  "data": { "message": "Comentario eliminado correctamente" }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `404` | No existe un comentario con ese `id` |
