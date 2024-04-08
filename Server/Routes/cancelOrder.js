
const express = require('express');
const router = express.Router();
const OrderModel = require('../Model/orderDetailsModel');


router.put('/', async (req, res)=>{
    console.log("cancel");
    const _Id = req.body.orderId;
    console.log("cancel",_Id);

  
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