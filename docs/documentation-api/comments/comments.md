# Comments

Comentarios sobre un post. Los endpoints de lectura y creación cuelgan de `/api/posts/:postId/comments` (montados en `posts.routes.js`); los de edición y borrado son directos por `commentId`.

---

## `GET /api/posts/:postId/comments`

**Ruta pública.**

Lista los comentarios de un post, más nuevos primero. 

**Auth requerida:** No

### Response `200 OK`

```json
{
  "data": [
    {
      "id": "comment_1",
      "content": "Buen artículo!",
      "postId": 12,
      "authorId": 1,
      "createdAt": "2026-08-05T12:00:00.000Z",
      "author": { "name": "User2" }
    }
  ]
}
```

### Errores

No aplica (si el post no existe, devuelve lista vacía en vez de 404).

---

## `POST /api/posts/:postId/comments`

Crea un comentario en un post.

**Auth requerida:** Sí

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `content` | string | Sí | no vacío |

```json
{ "content": "Buen artículo!" }
```

### Response `201 Created`

```json
{
  "data": {
    "id": "comment_1",
    "content": "Buen artículo!",
    "postId": 12,
    "authorId": 1,
    "createdAt": "2026-08-05T12:00:00.000Z",
    "author": { "name": "User2" }
  }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `400` | `content` vacío o faltante |
| `401` | Token faltante, inválido o expirado |
| `404` | No existe un post con el `postId` indicado |

---

## `PUT /api/comments/:commentId`

Edita un comentario propio.

**Auth requerida:** Sí

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `content` | string | Sí | no vacío |

### Response `200 OK`

Devuelve el comentario actualizado.

### Errores

| Código | Motivo |
|--------|--------|
| `400` | `content` vacío o faltante |
| `401` | Token faltante, inválido o expirado |
| `403` | El comentario no pertenece al usuario autenticado |
| `404` | No existe un comentario con ese `commentId` |

---

## `DELETE /api/comments/:commentId`

Elimina un comentario. Solo el autor del comentario o un `ADMIN`.

**Auth requerida:** Sí

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
| `403` | El usuario no es el autor del comentario ni `ADMIN` |
| `404` | No existe un comentario con ese `commentId` |
