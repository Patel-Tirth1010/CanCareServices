const express = require('express');
const router = express.Router();
const OrderModel = require('../Model/orderDetailsModel');
const EmployeeModel = require('../Model/EmployeeModel');
const app = express();






app.use(express.json());
app.use(express.urlencoded({ extended: true }));





router.get('/', async (req, res) => {
    const cust_Email =  req.query.custEmail;
    console.log("get")

    try{
        const orders = await OrderModel.aggregate([
            {
                $match: { cust_Email: cust_Email } // Match orders based on customer email
              },

            {
              $lookup: {
                from: 'Employee', // Name of the employee collection
                localField: 'emp_Email',
                foreignField: 'Email',
                as: 'employee'
              }
            },
            {
              $lookup: {
                from: 'Services', // Name of the service collection
                localField: 'SerId',
                foreignField: 'ser_Id',
                as: 'service'
              }
            },
            {
              $project: {
                "order_Status": 1,
                "Amount": 1,
                "SerDate": 1,
                "SerStartTime": 1,
                "SerEndTime": 1,
                "employee.FName": 1,
                "employee.LName": 1,  
                "service.ser_Name": 1,
                "service.price":1,
                "_id": 1 // Exclude _id field from output
              }
            }
          ]);
          console.log(orders)
     
          res.json(orders);


    }
    catch(e){
        console.log(e);
    }
   
});





module.exports = router;