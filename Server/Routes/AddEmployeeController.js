const express = require('express');
const router = express.Router();
const EmployeeModel = require('../Model/EmployeeModel');
const Emp_SerModel = require('../Model/emp_ser_Model');



// FName: FName,
// LName: LName,
// PhoneNumber:PhoneNumber,
// Email:email,
// password:password,
// JoiningDate:selectedDate,
// serviceId:selectedValue,
// Address: Address,
// City: City,
// Province: Province,
// ZipCode: ZipCode,
// order_count:0



router.post('/', async (req, res) => {
    // Extract data from request body
    const { FName, LName, PhoneNumber,Email, password, JoiningDate, serviceId, order_count,Address, City, Province, ZipCode } = req.body;
const Password = password;
const Status = true;
const order_Count=order_count;
const Ph_No = PhoneNumber;
    console.log("Add Emp",req.body);

    // Check if the provided custEmail matches the stored custEmail
    try {
        // Find the customer by email and update the profile data
        const employee = await EmployeeModel.findOne( {Email} );
        console.log("Employee:", employee);
        
        // Check if a document with the given email exists
        if (employee) {
               return res.json("exist");
        } else {
            // If no document with the given email exists, return "notexist"
            const newEmployee = await EmployeeModel.create({ FName,LName, Ph_No, Email, Password, Address, City, ZipCode, Province,Status,JoiningDate,order_Count});

            const newEmp_Ser = await Emp_SerModel.create({
                emp_Email:Email,
                ser_id:serviceId
            });
         
          return res.json(newEmployee); 
        }

       
      

    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
