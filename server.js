const express = require("express");
const app = express();
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Emploee Payroll pages" });
});

require("./app/routes/routes.js")(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
