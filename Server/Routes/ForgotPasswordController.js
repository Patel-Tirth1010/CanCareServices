const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminModel = require('../Model/AdminModel');
const EmployeeModel = require('../Model/EmployeeModel');
const CustomerModel = require('../Model/CustomerModel');
var nodemailer = require('nodemailer');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


const JWT_SECRET = "kabdklfnaipos;wlje298y493r8rhnovjc9m[,W.;aEL;AS/2ASCNX O2Q9W499Y8743'[][dca";


let user;


// POST request to create a new customer
router.post('/', async (req, res) => {
    const{email, selectedOption}=req.body
    console.log(req.body);

    const Email= email;
    let password ="";

   
    try {
        if(selectedOption=="cus"){
         user =  await CustomerModel.findOne({ email:email });
        password = user.password;
        }
        else if(selectedOption=="emp"){
        user = await EmployeeModel.findOne({ Email });
        password = user.Password;

       
        }
        else if(selectedOption=="admin"){
            user = await AdminModel.findOne({ email:email });
        password = user.password;

        }
        console.log(selectedOption, user);
        
        // Check if a document with the given email exists
        if (!user) {
          return res.json("notexist");  
        } 

const serect =JWT_SECRET + password;

const token = jwt.sign({email}, serect,{expiresIn:"5m"});
const link = `http://localhost:8000/forgotpassword/reset-password/${email}/${token}/${selectedOption}`;



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'patel1063tirth@gmail.com',
    pass: 'pqns qhim hqog rhxd'
  }
});

var mailOptions = {
  from: 'patel1063tirth@gmail.com',
  to: email,
  subject: 'Password reset link : CanCareServices',
  html: `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      p {
        color: #666;
        font-size:20px;
      }
      a {
        color: #007bff;
        text-decoration: none;
        font-size:20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Link</h1>
      <p>Click <a href="${link}">here</a> to reset your password.</p>
    </div>
  </body>
  </html>
`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);

  }
});

console.log(link);
res.json("sent")

    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get("/reset-password/:email/:token/:selectedOption", async (req, res)=>{
    const {email, token,selectedOption} = req.params;
    console.log(email,token);

    const Email= email;
    let password ="";



    try {
        if(selectedOption=="cus"){
         user =  await CustomerModel.findOne({ email:email });
        password = user.password;
        }
        else if(selectedOption=="emp"){
        user = await EmployeeModel.findOne({ Email });
        password = user.Password;

       
        }
        else if(selectedOption=="admin"){
            user = await AdminModel.findOne({ email:email });
        password = user.password;

        }
        
        
        // Check if a document with the given email exists
        if (!user) {
          return res.json("notexist");  
        } 


        const serect =JWT_SECRET + password;

        try{
            const verify = jwt.verify(token, serect);
           res.render("resetpass",{email, status:"not verified"})

        }
        catch(e){
            console.log(e);
            res.send("not Verified");

        }
    }
    
catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: 'Internal server error' });
}

   
})




router.post("/reset-password/:email/:token/:selectedOption", async (req, res)=>{
    const {email, token,selectedOption} = req.params;
    const {Password} = req.body;
    console.log("reset",email,token,Password);

    const Email= email;
    let password ="";



    try {
        if(selectedOption=="cus"){
         user =  await CustomerModel.findOne({ email:email });
        password = user.password;
        }
        else if(selectedOption=="emp"){
        user = await EmployeeModel.findOne({ Email });
        password = user.Password;

       
        }
        else if(selectedOption=="admin"){
            user = await AdminModel.findOne({ email:email });
        password = user.password;

        }
        
        
        // Check if a document with the given email exists
        if (!user) {
          return res.json("notexist");  
        } 


        const serect =JWT_SECRET + password;

        try{
            const verify = jwt.verify(token, serect);

            if(selectedOption=="cus"){
                await CustomerModel.updateOne({ email:email },
                    {
                        $set:{
                            password:Password,
                    },
                    }
                    );
                }
                else if(selectedOption=="emp"){
                    await EmployeeModel.updateOne({ Email },
                        {
                            $set:{
                                Password:Password,
                        },
                    }
                        );
        
               
                }
                else if(selectedOption=="admin"){
                    await AdminModel.updateOne({ email:email },
                        {
                            $set:{
                                password:Password,
                        },
                    }
                        );
        
        
                }
              

                // res.send("Password Updated");
                res.render("resetpass",{email, status:"verified"});

        }
        catch(e){
            console.log(e);
            res.send("not Verified");

        }
    }
    
catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: 'Internal server error' });
}

   
})



module.exports = router;