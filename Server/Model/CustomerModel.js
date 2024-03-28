const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    FName : String,
    LName : String,
    PhoneNumber: Number,
    email : String,
    password: String,
    Address: String,
    City: String,
    ZipCode: String,
    Province: String,
    EmailStatus: Boolean
});

const CustomerModel = mongoose.model("Customer", customerSchema, "Customer");

module.exports = CustomerModel;