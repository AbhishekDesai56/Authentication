const dbConfig = require("./database.config");
const mongoose = require("mongoose");
const logger = require('logger').createLogger('logger/development.log');

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
    logger.info("Successfully connected to the database");
  })
  .catch((err) => {
    logger.error("Could not connect to the database. Exiting now...");
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
