# Posts

CRUD de posts del blog. Ver también [Comments](../comments/comments.md) para los endpoints anidados de comentarios (`/api/posts/:postId/comments`).

Base path: `/api/posts`

---

## `GET /api/posts`

Lista los posts, con paginación, búsqueda, orden y filtro por categoría. Pública.

**Auth requerida:** No

### Query params

| Param | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `page` | number | `1` | Página a devolver |
| `limit` | number | `10` | Cantidad por página (máximo `40`) |
| `sort` | string | `newest` | `newest`, `oldest` o `comments` (más comentados primero) |
| `category` | string | — | Filtra por `slug` de categoría |
| `search` | string | — | Busca (case-insensitive) en `title` y `content` |

### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 12,
      "title": "Cómo armar un README de API",
      "content": "...",
      "coverImage": "https://res.cloudinary.com/.../image.jpg",
      "createdAt": "2026-08-01T10:00:00.000Z",
      "author": { "id": 1, "name": "Hernán Coronel", "avatarUrl": "https://..." },
      "categories": [{ "id": "clx1...", "name": "Backend", "slug": "backend" }],
      "commentCount": 3
    }
  ],
  "meta": { "total": 42, "page": 1, "limit": 10, "totalPages": 5 }
}
```

### Errores

No aplica (los params inválidos se sanitizan con defaults en vez de rechazarse).

---

## `GET /api/posts/:id`

Devuelve un post por `id`. Pública.

**Auth requerida:** No

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 12,
    "title": "Cómo armar un README de API",
    "content": "...",
    "coverImage": "https://res.cloudinary.com/.../image.jpg",
    "author": { "id": 1, "name": "Hernán Coronel", "avatarUrl": "https://..." },
    "categories": [{ "id": "clx1...", "name": "Backend", "slug": "backend" }]
  }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `404` | No existe un post con ese `id` |

---

## `POST /api/posts`

Crea un post. El autor es el usuario autenticado.

**Auth requerida:** Sí

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `title` | string | Sí | no vacío |
| `content` | string | Sí | no vacío |
| `coverImage` | string | No | URL válida |
| `categoryIds` | string[] | No | array de IDs de categoría existentes |

```json
{
  "title": "Cómo armar un README de API",
  "content": "...",
  "coverImage": "https://example.com/cover.jpg",
  "categoryIds": ["clx1a2b3c"]
}
```

### Response `201 Created`

Devuelve el post creado, con `author.name` y `categories` incluidos (mismo shape que `GET /api/posts/:id`).

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido (falta `title`/`content`, `coverImage` no es URL válida) |
| `401` | Token faltante, inválido o expirado |
| `404` | Algún `id` de `categoryIds` no corresponde a una categoría existente (falla el `connect` de Prisma) |

---

## `PUT /api/posts/:id`

Actualiza un post existente. Solo el autor o un `ADMIN`.

**Auth requerida:** Sí

### Body

Mismos campos que `POST /api/posts`, todos opcionales (`title`, `content`, `coverImage`, `categoryIds`).

### Response `200 OK`

Devuelve el post actualizado, con `categories` incluidas.

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido |
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no es el autor del post ni `ADMIN` |
| `404` | No existe un post con ese `id`, o algún `id` de `categoryIds` no corresponde a una categoría existente (falla el `set` de Prisma) |

---

## `DELETE /api/posts/:id`

Elimina un post. Solo el autor o un `ADMIN`.

**Auth requerida:** Sí

### Response `200 OK`

```json
{
  "success": true,
  "data": { "message": "Post eliminado con éxito" }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no es el autor del post ni `ADMIN` |
| `404` | No existe un post con ese `id` |
