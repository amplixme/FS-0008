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

- **Docker / Docker Compose** — para levantar PostgreSQL en desarrollo (opcional, ver más abajo)

## Estructura del proyecto

```txt
FS-0008/
├── frontend/          # Aplicación React (Vite)
├── backend/           # API REST (Express + Prisma)
└── docker-compose.yml # PostgreSQL para desarrollo local
```

## Requisitos previos

Antes de empezar, necesitás tener instalado:

- **[Node.js](https://nodejs.org/) v24 o superior**, ejecutá `node -v` en tu terminal para confirmar tu versión.
- **[Git](https://git-scm.com/)** para clonar el repositorio.
- **Una base de datos PostgreSQL disponible.** Tenés dos caminos, explicados en detalle en el paso 2:
  - Levantarla con Docker (recomendado, más rápido de arrancar).
  - Instalar PostgreSQL directamente en tu máquina.
- **(Opcional) Un cliente visual para PostgreSQL**, si querés inspeccionar los datos a simple vista. Cualquiera de estos sirve, no hace falta que todo el equipo use el mismo:
  - **[TablePlus](https://tableplus.com/)** — liviano, multiplataforma.
  - **[pgAdmin](https://www.pgadmin.org/)** — oficial de PostgreSQL, más completo.
  - **[Prisma Studio](#prisma-studio-opcional-sin-instalar-nada)** — ya viene incluido en este proyecto, sin instalar nada extra (ver más abajo).

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/amplixme/FS-0008.git
cd FS-0008
```

### 2. Levantar PostgreSQL

Necesitás una base de datos PostgreSQL corriendo antes de tocar el backend. Elegí **una** de estas dos opciones:

#### Opción A — Con Docker (recomendado)

Si tenés [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado, desde la **raíz del proyecto**:

```bash
docker compose up -d
```

Esto levanta un contenedor de PostgreSQL con la base ya creada (usuario, contraseña y nombre de base definidos en `docker-compose.yml`). Verificá que esté corriendo con:

```bash
docker ps
```

Deberías ver un contenedor llamado `blog-amplix-db` con estado `Up`. También podés confirmarlo visualmente desde la pestaña **Containers** de Docker Desktop.

**No hace falta crear la base de datos manualmente** en este camino el contenedor la crea sola al arrancar por primera vez, usando estos valores (ya reflejados en el `.env.example` del backend):

| Variable | Valor |
|---|---|
| Usuario | `blog` |
| Contraseña | `postgres` |
| Base de datos | `blog_db` |
| Host / Puerto | `localhost:5432` |

#### Opción B — Instalando PostgreSQL directamente

Si preferís no usar Docker, descargá PostgreSQL desde [postgresql.org](https://www.postgresql.org/) y seguí el instalador para tu sistema operativo. Durante la instalación vas a definir un usuario y contraseña (vas a necesitar estos datos para conectarte a la base de datos de manera local).

A diferencia de la Opción A, acá **sí tenés que crear la base de datos vos mismo** una vez instalado PostgreSQL. Podés hacerlo con cualquiera de los clientes visuales mencionados arriba (TablePlus, pgAdmin) creando una base nueva, por ejemplo `blog_db`.

Después, ajustá tu `DATABASE_URL` en el `.env` del backend (ver paso 3) para que coincida con el usuario, contraseña y nombre de base que vos definiste, no con los valores de ejemplo del Docker.

#### Conectarte para ver los datos (opcional)

Sea cual sea la opción que elegiste, si querés explorar las tablas visualmente:

- **TablePlus / pgAdmin:** creá una nueva conexión con `Host: localhost`, `Port: 5432`, y el usuario/contraseña/base que corresponda a tu opción (A o B).
- **Prisma Studio:** no necesita configuración de conexión aparte — una vez que el backend esté configurado (paso 3), corré `npx prisma studio` desde `backend/` y se abre en el navegador automáticamente.

No hay una herramienta "correcta" acá — usá la que te resulte más cómoda, es indistinto para el resto del equipo.

### 3. Configurar y levantar el backend

```bash
cd backend
npm install
```

Creá un archivo `.env` en la carpeta `backend/`, usando `.env.example` como referencia (ver la sección [Variables de entorno](#variables-de-entorno) más abajo para el detalle de cada valor).

#### Prisma ORM: generar el cliente y aplicar migraciones

Este proyecto usa **Prisma** como ORM, es la capa que traduce entre tu código JavaScript y las tablas de PostgreSQL, y también gestiona el historial de cambios al esquema de la base (las "migraciones").

Con el `.env` ya configurado, corré estos dos comandos **en ese orden**:

```bash
npx prisma generate
```

Esto genera el código del cliente de Prisma (`PrismaClient`) que tu aplicación usa para hacer queries, es un paso obligatorio la primera vez que cloná el proyecto, y cada vez que cambie el esquema (`schema.prisma`).

```bash
npx prisma migrate dev
```

Esto aplica contra tu base todas las migraciones ya creadas por el equipo (creación de tablas, columnas, etc.), dejándola sincronizada con `schema.prisma`. Si es la primera vez que corrés esto, vas a ver cómo se crean las tablas `User` y demás.

#### Iniciar el servidor backend

```bash
npm run dev
```

El servidor debería quedar escuchando en `http://localhost:3000` (o el puerto que haya sido definido en el archivo `.env`).

### 4. Configurar y levantar el frontend

En otra terminal, desde la raíz del proyecto:

```bash
cd frontend
npm install
```

Creá un archivo `.env` en la carpeta `frontend/`, usando `.env.example` como referencia.

```bash
npm run dev
```

Vite va a mostrarte en la terminal la URL local donde se ejecuta el servidor (por defecto `http://localhost:5173`).

## Variables de entorno

### Backend (`backend/.env.example`)

```bash
PORT = "3000"
DATABASE_URL= "postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
JWT_SECRET= "tu_secret_seguro_de_al_menos_64_caracteres"
```

- **`PORT`**: puerto donde corre el servidor Express.
- **`DATABASE_URL`**: cadena de conexión a PostgreSQL. Si usaste Docker (Opción A del paso 2), reemplazá `USER:PASSWORD@HOST:PORT/DATABASE_NAME` por `blog:postgres@localhost:5432/blog_db`. Si instalaste PostgreSQL vos mismo (Opción B), usá los datos que definiste en tu instalación.
- **`JWT_SECRET`**: clave usada para firmar los tokens de sesión. En desarrollo podés generar una aleatoria ejecutando `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` desde la terminal. **Nunca** se comparte ni se sube al repositorio.

### Frontend (`frontend/.env.example`)

```bash
VITE_API_URL=http://localhost:3000/api
```

- **`VITE_API_URL`**: URL base del backend que consume el frontend. Con la configuración por defecto de este proyecto, no hace falta cambiarla.
