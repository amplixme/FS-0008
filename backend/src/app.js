import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/error.middleware.js";
import routes from './routes/index.js'; // 1. Solo importamos nuestra "Recepción" central

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 2. Criterio de aceptación: Montar TODAS las rutas bajo el prefijo /api
app.use('/api', routes); 

// 3. El middleware de errores SIEMPRE va después de las rutas
app.use(errorHandler);

// 4. Iniciar el servidor siempre va al final
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});