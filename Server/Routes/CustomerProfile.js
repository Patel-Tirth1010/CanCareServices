const express = require('express');
const router = express.Router();
const CustomerModel = require('../Model/CustomerModel');
const EmployeeModel = require('../Model/EmployeeModel');
const AdminModel = require('../Model/AdminModel');






let user;


router.get('/', async (req, res) => {
    const email =  req.query.Email;
    const loggedIn = req.query.loggedIn;
    const Email = email;
    console.log("get prof", email)

    try{
        if(loggedIn=="cus"){
       user =  await CustomerModel.findOne({ email:email });
        }
        else if(loggedIn=="emp"){
            user =  await EmployeeModel.findOne({ Email });

        }
        else if(loggedIn == "admin"){
            user =  await AdminModel.findOne({ email:email });

        }
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
    const { Email, loggedIn,FName, LName, Address, City, Province, ZipCode } = req.body;

    console.log("update prof",req.body);

    // Check if the provided custEmail matches the stored custEmail
    try {
        // Find the customer by email and update the profile data
       

        if(loggedIn=="cus"){
            user =  await CustomerModel.findOneAndUpdate(
                { email:Email }, // Query to find the customer by email
                { FName, LName,  Address, City, Province, ZipCode }, // Updated profile data
                { new: true } // Return the updated document
            );
             }
             else if(loggedIn=="emp"){
                 user =  await EmployeeModel.findOneAndUpdate(
                    { Email:Email }, // Query to find the customer by email
                    { FName, LName,  Address, City, Province, ZipCode }, // Updated profile data
                    { new: true } // Return the updated document
                );
             }
             else if(loggedIn == "admin"){
                 user = await AdminModel.findOneAndUpdate(
                    { email:Email }, // Query to find the customer by email
                    { FName, LName,  Address, City, Province, ZipCode }, // Updated profile data
                    { new: true } // Return the updated document
                );
             }
        console.log("update",user);

        if (!user) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Return the updated customer profile
        res.json(user);
    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
