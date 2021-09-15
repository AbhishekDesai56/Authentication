require("dotenv").config();
require("./config/connection");
const swaggerUi = require('swagger-ui-express');
const express = require("express");
const swaggerDocument = require('./swagger/swagger.json');
// eslint-disable-next-line import/order
const logger = require('logger').createLogger('logger/development.log');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Emploee Payroll pages" });
});

require("./app/routes/routes")(app);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
  logger.info("Server is listening on port 3000");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = server;
