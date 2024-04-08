const express = require('express');
const router = express.Router();
const OrderModel = require('../Model/orderDetailsModel');
const feedbackModel = require('../Model/FeedbackModel');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kabdklfnaipos;wlje298y493r8rhsdfjkvnsow2novjc9m[,W.;aEL;AS/2ASCNX O2Q9W499Y8743'[][dca";
let employeeEmail;
let customerEmail;
let serviceId;



var startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0))




router.get('/', async (req, res) => {
    const emp_Email =  req.query.empEmail;

    try{
        const orders = await OrderModel.aggregate([
            {
                $match: { emp_Email: emp_Email,
                    SerDate:startOfDay
                  
                } // Match orders based on customer email
              },

            {
              $lookup: {
                from: 'Customer', // Name of the employee collection
                localField: 'cust_Email',
                foreignField: 'email',
                as: 'customer'
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
                "emp_Email":1,
                "SerId":1,
                "Amount": 1,
                "SerDate": 1,
                "SerStartTime": 1,
                "SerEndTime": 1,
                "customer.FName": 1,
                "customer.LName": 1, 
                "cust_Email":1, 
                "customer.PhoneNumber": 1,  
                "Address": 1,  
                "City": 1,  
                "Province": 1,  
                "ZipCode": 1,  
                "service.ser_Name": 1,
                "service.price":1,
                "_id": 1 // Exclude _id field from output
              }
            }
          ]);
          console.log(orders)
     
          console.log("get emp today orders", startOfDay)
          res.json(orders);


    }
    catch(e){
        console.log(e);
    }
   
});





router.put('/completed', async (req, res)=>{
  const _Id = req.body.orderId;
 customerEmail =  req.body.cust_Email;
 employeeEmail =  req.body.emp_Email;
 serviceId =  req.body.ser_Id;


  console.log("completed", req.body)

    try {
        // Find the customer by _id and delete the record
        const completedOrder = await OrderModel.findByIdAndUpdate({

         _id:_Id   
        },
        {
            order_Status:"Completed",
        }
        );



        const serect =JWT_SECRET + _Id;


        if (!completedOrder) {  
            return res.status(404).json({ error: 'Order not found' });
        }


        
const token = jwt.sign({_Id}, serect,{expiresIn:"5m"});
const link = `http://localhost:8000/todaysOrders/completed/rating/${_Id}/${token}`;




var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'patel1063tirth@gmail.com',
    pass: 'pqns qhim hqog rhxd'
  }
});
console.log("customerEmail", customerEmail);
var mailOptions = {
  from: 'patel1063tirth@gmail.com',
  to: customerEmail,
  subject: 'Service Completed : CanCareServices',
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
      <h1>Rate our Service and provide some feedback</h1>
      <p>Click <a href="${link}">here</a> to rate us and give feedback</p>
    </div>
  </body>
  </html>
`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response+"\n"+ link);
  }
});


     // Return a success message or any other appropriate response
        res.json('Order Completed successfully');
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get("/completed/rating/:_Id/:token", async (req, res)=>{
  const {_Id, token} = req.params;
  // const {rating, feedback} = req.body;
  console.log("rating:",_Id,token);

      const serect = JWT_SECRET + _Id;

      try{
          const verify = jwt.verify(token, serect);
         res.render("rating",{_Id, status:"not verified"})

      }
      catch(e){
          console.log(e);
          res.send("not Verified");

      }
  
 
})




router.post("/completed/rating/:_Id/:token", async (req, res)=>{
  const {_Id, token} = req.params;
  const {Rating, Feedback} = req.body;
  console.log("rating:",_Id,token,req.body);

 
      const serect =JWT_SECRET + _Id;

      try{
          const verify = jwt.verify(token, serect);

          

         
          const feedback = await feedbackModel.create({order_id:_Id,
          cust_Email:customerEmail,
          emp_Email:employeeEmail,
          ser_id:serviceId,
          rating:Rating,
          description:Feedback
          })

          console.log(feedback);
             
              res.render("rating",{_Id, status:"verified"});

      }
      catch(e){
          console.log(e);
          res.send("not Verified");

      }
  }
  

 
)





module.exports = router;      