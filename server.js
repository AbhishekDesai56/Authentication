require("dotenv").config();
require("./config/connection");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Emploee Payroll pages" });
});

require("./app/routes/routes.js")(app);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});
