# Categories

Categorías usadas para clasificar posts.

Base path: `/api/categories`

---

## `GET /api/categories`

Lista todas las categorías, ordenadas por `name`. Pública.

**Auth requerida:** No

### Response `200 OK`

```json
{
  "success": true,
  "data": [
    { "id": "clx1a2b3c", "name": "Backend", "slug": "backend" }
  ]
}
```

---

## `POST /api/categories`

Crea una categoría.

**Auth requerida:** Sí (rol `ADMIN`)

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `name` | string | Sí | no vacío |
| `slug` | string | Sí | no vacío |

```json
{ "name": "Backend", "slug": "backend" }
```

### Response `201 Created`

```json
{
  "success": true,
  "data": { "id": "clx1a2b3c", "name": "Backend", "slug": "backend" }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Falta `name` o `slug` |
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `409` | Ya existe una categoría con ese `slug` (constraint `unique` de Prisma — no hay chequeo manual previo) |

---

## `PUT /api/categories/:id`

Actualiza una categoría.

**Auth requerida:** Sí (rol `ADMIN`)

### Body

`name` y `slug`, ambos opcionales (mismo formato que el `POST`).

### Response `200 OK`

Devuelve la categoría actualizada.

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido |
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `404` | No existe una categoría con ese `id` |
| `409` | El `slug` que se intenta setear ya lo usa otra categoría |

> Nota de implementación: `categoryService.update` no chequea a mano si la categoría existe ni si el `slug` está repetido — llama directo a `prisma.category.update`. El `404`/`409` de la tabla salen del error handler global traduciendo `P2025`/`P2002` de Prisma, así que el mensaje que ve el cliente es genérico (`"Recurso no encontrado"` / `"Ya existe un registro con ese slug"`) en vez de uno específico de categorías.

---

## `DELETE /api/categories/:id`

Elimina una categoría. Falla si tiene posts asociados.

**Auth requerida:** Sí (rol `ADMIN`)

### Response `200 OK`

```json
{
  "success": true,
  "data": { "message": "Categoría eliminada correctamente" }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
| `403` | El usuario no tiene rol `ADMIN` |
| `409` | La categoría tiene posts asociados |
