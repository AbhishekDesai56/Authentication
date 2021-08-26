require("dotenv").config();
require("./config/connection");
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Emploee Payroll pages" });
});

require("./app/routes/routes")(app);

var server = app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = server;
