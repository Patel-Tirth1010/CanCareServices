const express = require('express');
const router = express.Router();
const CustomerModel = require('../Model/CustomerModel');








router.post('/', async (req, res) => {
    const email =  req.query.cust_Email;
    console.log("get prof")

    try{
       const user =  await CustomerModel.findOne({ email:email });
       console.log(user)
       if(user){
        res.json(user)

       }
       else{
        res.json("error");
       }

    }
    catch(e){
        console.error("Error creating customer:", e);
        res.status(500).json({ error: 'Internal server error' });
    }
   
});





module.exports = router;
