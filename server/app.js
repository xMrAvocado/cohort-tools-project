process.loadEnvFile();

require("./db");

const express = require("express");
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

const config = require("./config");
config(app);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);

// GESTIÓN DE ERRORES

const handleErrors = require("./errors");
handleErrors(app);

// START SERVER
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
