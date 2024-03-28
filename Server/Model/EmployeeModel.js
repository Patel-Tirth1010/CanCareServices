const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    FName : String,
    LName : String,
    Ph_No: Number,
    Email : String,
    Password: String,
    Address: String,
    City: String,
    ZipCode: String,
    Province: String,
    order_Count: Number,
    JoiningDate: Date,
    Status:Boolean

});

const EmployeeModel = mongoose.model("Employee", employeeSchema, "Employee");

module.exports = EmployeeModel;