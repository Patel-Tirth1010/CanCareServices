const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/CanCareServices")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB:", error);
    });

module.exports = mongoose.connection;