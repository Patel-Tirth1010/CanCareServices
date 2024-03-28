const express = require('express');
const router = express.Router();
const CustomerModel = require('../Model/CustomerModel');
const app = express();
const session = require('express-session');
const EmployeeModel = require('../Model/EmployeeModel');
const AdminModel = require('../Model/AdminModel');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Define routes for the Customer collection


let user;


// POST request to create a new customer
router.post('/', async (req, res) => {
    const{email,password, selectedOption}=req.body
    const Email= email;
    let Password;
    try {
        if(selectedOption=="Customer"){
         user =  await CustomerModel.findOne({ email:email });
         Password=user.password
        }
        else if(selectedOption=="Employee"){
        user = await EmployeeModel.findOne({ Email });
        Password = user.Password;
        }
        else if(selectedOption=="Admin"){
            user = await AdminModel.findOne({ email:email });
            Password=user.password

        }
        console.log(selectedOption, user, password);
        
        // Check if a document with the given email exists
        if (user) {
            console.log("first if",user)
            // If the password matches, return "exist"
            if (Password === password) {
                console.log("req.session",req.session);
                req.session.user = user;
                console.log("req.session",req.session);

                res.json(user);
            } else {
                // If the password doesn't match, return "password mismatch"
                res.json("notexist");
                console.log("notexist"+user.password+user.email);
            }
        } else {
            // If no document with the given email exists, return "notexist"
            res.json("notexist");
            console.log("notexist");

        }
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/session-status', (req, res) => {
    console.log("session check",req.session);
    if (req.session.user) {
        res.send('loggedIn');
    } else {
        res.send('notLoggedIn');
    }
});

module.exports = router;