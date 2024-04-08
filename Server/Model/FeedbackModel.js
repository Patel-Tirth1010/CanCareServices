const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    order_id : String,
    cust_Email:String,
    emp_Email: String,
    ser_id:String,
    rating:String,
    description:String
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema, "Feedback");

module.exports = FeedbackModel;