import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from './routes/posts.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


// ROUTES
app.use("/api/auth", authRoutes);
app.use('/api/posts', postRoutes); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
