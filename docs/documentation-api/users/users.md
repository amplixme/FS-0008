# Users

Perfil público de un usuario y edición del perfil propio.

Base path: `/api/users`

---

## `GET /api/users/:id`

Devuelve el perfil público de un usuario junto con sus posts. Pública.

**Auth requerida:** No

### Response `200 OK`

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "bio": "Full-stack developer and tech enthusiast",
    "avatarUrl": "https://res.cloudinary.com/demo/image/upload/v123456789/avatar.jpg",
    "createdAt": "2026-01-10T09:00:00.000Z",
    "posts": [
      {
        "id": 12,
        "title": "How to Build a REST API",
        "content": "Learn how to build a REST API with Node.js...",
        "coverImage": "https://res.cloudinary.com/demo/image/upload/v123456789/cover.jpg",
        "createdAt": "2026-08-01T10:00:00.000Z",
        "categories": [
          { "id": "clx1a2b3c", "name": "Backend", "slug": "backend" }
        ]
      }
    ],
    "postsCount": 1
  }
}
```

### Errores

| Código | Motivo                            |
| ------ | --------------------------------- |
| `404`  | No existe un usuario con ese `id` |

---

## `PUT /api/users/me`

Actualiza el perfil del usuario autenticado.

**Auth requerida:** Sí

### Body

| Campo       | Tipo   | Requerido | Validación |
| ----------- | ------ | --------- | ---------- |
| `name`      | string | No        | no vacío   |
| `bio`       | string | No        | no vacío   |
| `avatarUrl` | string | No        | URL válida |

> Los tres campos son opcionales (schema `.partial()`), pero si se envían no pueden estar vacíos.

```json
{
  "name": "Jane Smith",
  "bio": "Frontend developer passionate about React",
  "avatarUrl": "https://res.cloudinary.com/demo/image/upload/v123456789/avatar.jpg"
}
```

### Response `200 OK`

```json
{
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "bio": "Frontend developer passionate about React",
    "avatarUrl": "https://res.cloudinary.com/demo/image/upload/v123456789/avatar.jpg"
  }
}
```

### Errores

| Código | Motivo                                                     |
| ------ | ---------------------------------------------------------- |
| `400`  | Body inválido (campo vacío o `avatarUrl` no es URL válida) |
| `401`  | Token faltante, inválido o expirado                        |
