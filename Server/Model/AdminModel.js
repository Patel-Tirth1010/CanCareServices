const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    FName : String,
    LName : String,
    PhoneNumber: Number,
    email : String,
    password: String,
    Address: String,
    City: String,
    ZipCode: String,
    Province: String,
    
});

const AdminModel = mongoose.model("Admin", adminSchema, "Admin");

module.exports = AdminModel;