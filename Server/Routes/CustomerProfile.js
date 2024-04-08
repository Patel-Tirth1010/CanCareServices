const express = require('express');
const router = express.Router();
const CustomerModel = require('../Model/CustomerModel');








router.get('/', async (req, res) => {
    const email =  req.query.custEmail;
    console.log("get prof", email)

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


router.put('/update', async (req, res) => {
    // Extract data from request body
    const { custEmail, FName, LName, email, Address, City, Province, ZipCode } = req.body;

    console.log("update prof",req.body);

    // Check if the provided custEmail matches the stored custEmail
    try {
        // Find the customer by email and update the profile data
        const updatedCustomer = await CustomerModel.findOneAndUpdate(
            { email: custEmail }, // Query to find the customer by email
            { FName, LName, email, Address, City, Province, ZipCode }, // Updated profile data
            { new: true } // Return the updated document
        );
        console.log(updatedCustomer);

        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Return the updated customer profile
        res.json(updatedCustomer);
    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
