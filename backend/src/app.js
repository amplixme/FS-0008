import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin encabezado Origin (moviles, cURL, Postman, etc.)
    if (!origin) return callback(null, true);

    const isProduction = process.env.NODE_ENV === "production";

    if (!isProduction) {
      // En desarrollo permite cualquier puerto de localhost (http://localhost:*)
      const localhostRegex = /^http:\/\/localhost(:\d+)?$/;
      if (localhostRegex.test(origin)) {
        return callback(null, true);
      }
    }

    // En produccion permite SOLO el origen especificado en CORS_ORIGIN
    if (process.env.CORS_ORIGIN && origin === process.env.CORS_ORIGIN) {
      return callback(null, true);
    }

    return callback(new Error("Acceso no permitido por la política de CORS"));
  },
  credentials: true,
};

const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Agregador de rutas centralizado
app.use("/api", routes);

// El middleware de errores va después de las rutas
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
