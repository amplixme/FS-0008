const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("../src/middlewares/error.middleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
