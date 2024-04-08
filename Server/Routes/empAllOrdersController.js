const express = require('express');
const router = express.Router();
const OrderModel = require('../Model/orderDetailsModel');








router.get('/', async (req, res) => {
    const emp_Email =  req.query.empEmail;
const date = req.query.date;

if(date==""){
    try{
        const ordersPending = await OrderModel.aggregate([
            {
                $match: { emp_Email: emp_Email, order_Status:
                  "Pending"
                  } // Match orders based on customer email
              },

            {
              $lookup: {
                from: 'Customer', // Name of the employee collection
                localField: 'cust_Email',
                foreignField: 'email',
                as: 'customer'
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
              $sort: { SerDate: -1 } // Sort orders by SerDate in ascending order
          },
            {
              $project: {
                "order_Status": 1,
                "Amount": 1,
                "SerDate": 1,
                "SerStartTime": 1,
                "SerEndTime": 1,
                "customer.FName": 1,
                "customer.LName": 1,  
                "customer.PhoneNumber": 1,  
                "Address": 1,  
                "City": 1,  
                "Province": 1,  
                "ZipCode": 1,  
                "service.ser_Name": 1,
                "service.price":1,
                "_id": 1 // Exclude _id field from output
              }
            }
          ]);
          console.log(ordersPending)

          const ordersCompleted = await OrderModel.aggregate([
            {
                $match: { emp_Email: emp_Email, order_Status:
                  "Completed"
                  } // Match orders based on customer email
              },

            {
              $lookup: {
                from: 'Customer', // Name of the employee collection
                localField: 'cust_Email',
                foreignField: 'email',
                as: 'customer'
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
              $sort: { SerDate: -1 } // Sort orders by SerDate in ascending order
          },
            {
              $project: {
                "order_Status": 1,
                "Amount": 1,
                "SerDate": 1,
                "SerStartTime": 1,
                "SerEndTime": 1,
                "customer.FName": 1,
                "customer.LName": 1,  
                "customer.PhoneNumber": 1,  
                "Address": 1,  
                "City": 1,  
                "Province": 1,  
                "ZipCode": 1,  
                "service.ser_Name": 1,
                "service.price":1,
                "_id": 1 // Exclude _id field from output
              }
            }
          ]);
          console.log(ordersCompleted)
     
          console.log("get emp all orders", startOfDay)
         return res.json({ordersPending, ordersCompleted});
    }
    catch(e){
        console.log(e);
    }

}
else{
var startOfDay = new Date(new Date(date).setUTCHours(0, 0, 0, 0));

    try{
        const ordersPending = await OrderModel.aggregate([
            {
                $match: { emp_Email: emp_Email, SerDate:startOfDay, order_Status:
                  "Pending"
                  }
                 // Match orders based on customer email
              },

            {
              $lookup: {
                from: 'Customer', // Name of the employee collection
                localField: 'cust_Email',
                foreignField: 'email',
                as: 'customer'
              }
            },
            {
              $lookup: {
                from: 'Services', // Name of the service collection
                localField: 'SerId',
                foreignField: 'ser_Id',
                as: 'service'
              }
            },{
              $sort: { SerDate: -1 } // Sort orders by SerDate in ascending order
          },
            {
              $project: {
                "order_Status": 1,
                "Amount": 1,
                "SerDate": 1,
                "SerStartTime": 1,
                "SerEndTime": 1,
                "customer.FName": 1,
                "customer.LName": 1,  
                "customer.PhoneNumber": 1,  
                "Address": 1,  
                "City": 1,  
                "Province": 1,  
                "ZipCode": 1,  
                "service.ser_Name": 1,
                "service.price":1,
                "_id": 1 // Exclude _id field from output
              }
            }
          ]);
          console.log(ordersPending)
     



          const ordersCompleted = await OrderModel.aggregate([
            {
                $match: { emp_Email: emp_Email, SerDate:startOfDay, order_Status:
                  "Completed"
                  }
                 // Match orders based on customer email
              },

            {
              $lookup: {
                from: 'Customer', // Name of the employee collection
                localField: 'cust_Email',
                foreignField: 'email',
                as: 'customer'
              }
            },
            {
              $lookup: {
                from: 'Services', // Name of the service collection
                localField: 'SerId',
                foreignField: 'ser_Id',
                as: 'service'
              }
            },{
              $sort: { SerDate: -1 } // Sort orders by SerDate in ascending order
          },
            {
              $project: {
                "order_Status": 1,
                "Amount": 1,
                "SerDate": 1,
                "SerStartTime": 1,
                "SerEndTime": 1,
                "customer.FName": 1,
                "customer.LName": 1,  
                "customer.PhoneNumber": 1,  
                "Address": 1,  
                "City": 1,  
                "Province": 1,  
                "ZipCode": 1,  
                "service.ser_Name": 1,
                "service.price":1,
                "_id": 1 // Exclude _id field from output
              }
            }
          ]);
          console.log(ordersCompleted)
          console.log("get emp all orders filer" , startOfDay,date)
         return res.json({ordersPending, ordersCompleted});
    }
    catch(e){
        console.log(e);
    }

}
   
});








module.exports = router;