import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/error.middleware.js";
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Agregador de rutas centralizado
app.use('/api', routes); 

// El middleware de errores va después de las rutas
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});