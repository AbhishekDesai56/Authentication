require("./config/connection");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Emploee Payroll pages" });
});

require("./app/routes/routes.js")(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
