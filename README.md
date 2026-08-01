# FS-0008

AmplixMe Acceleration Program — Javascript

## Descripción del proyecto

Aplicación de blog con sistema de comentarios y autenticación. Los usuarios pueden registrarse, iniciar sesión y crear publicaciones (posts), diferenciando entre roles de administrador y usuario regular.

## Stack Tecnológico

### Frontend

- **Vite** — bundler y servidor de desarrollo
- **React 19** — librería de UI
- **React Router** — enrutador del lado del cliente
- **Tailwind CSS v4** — estilos
- **React Hook Form + Zod** — formularios y validación
- **Axios** — cliente HTTP

### Backend

- **Node.js** (v24+)
- **Express 5** — framework HTTP
- **PostgreSQL** — base de datos relacional
- **Prisma ORM** — acceso a datos y migraciones
- **JWT (jsonwebtoken)** — autenticación basada en tokens
- **bcrypt** — hasheo de contraseñas
- **Zod** — validación de datos

### Infraestructura

- **Docker / Docker Compose** — para levantar PostgreSQL en desarrollo (opcional)

## Estructura del proyecto

```txt
FS-0008/
├── frontend/          # Aplicación React (Vite)
├── backend/           # API REST (Express + Prisma)
├── docs/              # Documentación del proyecto
└── docker-compose.yml # PostgreSQL para desarrollo local
```

## Instalación del proyecto

Para clonar el repositorio, levantar la base de datos, configurar las variables de entorno y correr el frontend y el backend, consultá la siguiente guía.

**[GUIA DE INSTALACIÓN](./docs/setup.md)**