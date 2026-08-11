# Auth

Endpoints de registro, login y sesión del usuario autenticado.

Base path: `/auth`

---

## `POST /auth/register`

Registra un nuevo usuario.

**Auth requerida:** No

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `name` | string | Sí | mínimo 2 caracteres |
| `email` | string | Sí | formato de email válido |
| `password` | string | Sí | mínimo 6 caracteres |

```json
{
  "name": "user",
  "email": "user@example.com",
  "password": "secret123"
}
```

### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "message": "Usuario registrado exitosamente"
  }
}
```

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido (nombre corto, email mal formado, password corta) |
| `409` | El email ya está registrado |

---

## `POST /auth/login`

Autentica un usuario y devuelve un JWT.

**Auth requerida:** No

### Body

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| `email` | string | Sí | formato de email válido |
| `password` | string | Sí | mínimo 6 caracteres |

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "name": "user",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

> ⚠️ El shape exacto de `user` depende de `authService.loginUser`. Ajustar si el service devuelve otros campos.

### Errores

| Código | Motivo |
|--------|--------|
| `400` | Body inválido |
| `401` | Email o contraseña incorrectos |

---

## `GET /auth/me`

Devuelve los datos del usuario autenticado.

**Auth requerida:** Sí (`Authorization: Bearer <token>`)

### Body

No requiere.

### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "user",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

> ⚠️ `req.user` se arma en `authMiddleware`; confirmar los campos exactos que inyecta.

### Errores

| Código | Motivo |
|--------|--------|
| `401` | Token faltante, inválido o expirado |
