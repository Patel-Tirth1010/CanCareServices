const express = require('express');
const router = express.Router();

const CustomerModel = require('../Model/CustomerModel');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Define routes for the Customer collection

const Address = "";
const City="";
const Zipcode = "";
const Province = "";
const EmailStatus = false;


// POST request to create a new customer
router.post('/', async (req, res) => {
    const{ FName, LName, password, email, PhoneNumber}=req.body
    // FName : String,
    // LName : String,
    // PhoneNumber: Number,
    // _email :{ 
    //     type: String,
    //     unique: true},
    // password: String,
    // Address: String,
    // City: String,
    // ZipCode: String,
    // province: String,
    // EmailStatus: Boolean
    
    try {
        const customer = await CustomerModel.findOne( {email} );
        console.log("Customer:", customer, req.body, email);
        
        // Check if a document with the given email exists
        if (customer) {
                res.json("exist");
        } else {
            // If no document with the given email exists, return "notexist"
            const newCustomer = await CustomerModel.create({ FName,LName, PhoneNumber, email, password, Address, City, Zipcode, Province,EmailStatus});
         
            res.json(newCustomer); 
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;