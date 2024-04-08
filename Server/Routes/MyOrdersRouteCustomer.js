const express = require('express');
const router = express.Router();
const OrderModel = require('../Model/orderDetailsModel');







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





router.put('/Cancel', async (req, res)=>{
  const _Id = req.params.id;

    try {
        // Find the customer by _id and delete the record
        const deletedOrder = await OrderModel.findByIdAndDelete(_Id);

        if (!deletedOrder) {  
            return res.status(404).json({ error: 'Order not found' });
        }

        // Return a success message or any other appropriate response
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;