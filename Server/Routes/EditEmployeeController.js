const express = require('express');
const router = express.Router();
const EmployeeModel = require('../Model/EmployeeModel');
const Emp_SerModel = require('../Model/emp_ser_Model');





router.get('/', async (req,res)=>{
    const Email = req.query.Email;
    console.log(req.query, Email);

    try{

const employee = await EmployeeModel.findOne({Email});

if(!employee){
    return res.json("notexist");
}
console.log("Employee: " ,employee);
return res.json(employee)

    }
    catch(error){
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})







router.post('/editEmployee', async (req, res) => {
    // Extract data from request body
    const {  SearchEmail,FName, LName, PhoneNumber,Email, password, JoiningDate, serviceId, order_count,Address, City, Province, ZipCode } = req.body;
const Password = password;
const Status = true;
const order_Count=order_count;
const Ph_No = PhoneNumber;
    console.log("Update Emp",req.body);

    // Check if the provided custEmail matches the stored custEmail
    try {
        // Find the customer by email and update the profile data
        const employee = await EmployeeModel.findOneAndUpdate( {Email:SearchEmail},
            { FName, LName, Ph_No,Email, Password, JoiningDate, order_Count,Address, City, Province, ZipCode},
            {
                new:true
            }
            );
        console.log("updated Employee:", employee);
        
        return res.json("Updated");

    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
