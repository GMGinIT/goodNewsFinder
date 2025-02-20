const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const indexRoutes = require("./routes/index.routes");
const serverConfig = require("./config/serverConfig");

const app = express();
const port = process.env.PORT || 3000;

serverConfig(app);
app.use("/api", indexRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
