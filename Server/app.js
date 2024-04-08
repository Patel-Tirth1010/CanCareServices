




const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session');

const connection = require('./Connection'); // Import the database connection
const LoginRouteCustomer = require('./Routes/LoginRouteCustomer');
const RegisterRouteCustomer = require('./Routes/RegisterRouteCustomer');  // Import customer routes
const placeOrder = require('./Routes/placeOrder');
const  MyOrdersRouteCustomer = require('./Routes/MyOrdersRouteCustomer');
const  CustomerProfile = require('./Routes/CustomerProfile');
const CancleOrder = require('./Routes/cancelOrder');


const bodyParser = require('body-parser');

// const employeeRoutes = require('./employeeRoutes'); // Import employee routes




// Use express middleware
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["POST","GET","PUT"],
        credentials: true
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json())





app.use(session({
    secret: 'CanCareServices', // Change to a secure secret key
    resave: false,
    saveUninitialized: false 
  }));
  

// Mount the routes
app.use('/login', LoginRouteCustomer);
app.use('/register', RegisterRouteCustomer);
app.use('/placeOrder', placeOrder);
app.use('/myOrders', MyOrdersRouteCustomer);
app.use('/profile', CustomerProfile);
app.use('/cancle', CancleOrder);


// app.use('/employees', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});