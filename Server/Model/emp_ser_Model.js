const mongoose = require('mongoose');

const empSerSchema = new mongoose.Schema({
   emp_Email: String,
   ser_id: String
});

const EmpSer = mongoose.model("Emp_Ser", empSerSchema, "Emp_Ser");

module.exports = EmpSer;