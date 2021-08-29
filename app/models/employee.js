const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  department: {
    type: Array,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Employeedb = mongoose.model("employee", employeeSchema);
