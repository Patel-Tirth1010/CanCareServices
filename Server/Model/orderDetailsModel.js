const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    emp_Email: String,
    SerId: String,
    cust_Email: String,
    Address: String,
    City: String,
    State: String,
    ZipCode: String,
    Province: String,
    SerDate: Date,
    SerStartTime: String,
    SerEndTime : String,
    BookedDate: Date,
    Amount : Number,
    order_Status: String
    

  
});

const OrderModel = mongoose.model("Order", orderSchema, "Order");

module.exports = OrderModel;