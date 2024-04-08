const express = require('express');
const router = express.Router();
const app = express();
const empSerModel = require('../Model/emp_ser_Model');
const OrderModel = require('../Model/orderDetailsModel');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));



router.post('/', async (req, res) => {
    

    let cust_email = req.body.cust_Email;
    let serviceId = req.body.id;
    let approx_time = req.body.time;
    let date = req.body.selectedDate;
    let address = req.body.streetAddress;
    let city = req.body.city;
    let province = req.body.state;
    let zipcode = req.body.zipCode;
    let Total = req.body.estimatedCost;
    let BookedDate = new Date();
    let ser_id = serviceId;
    let SerId = serviceId;
    let SerDate = date;
    let order_Status = "Pending";

    let LastServiceEndTime;
    if(serviceId=='1'){
       LastServiceEndTime = 21;
    }
    else if(serviceId=='2' || serviceId=='3'){
        LastServiceEndTime = 20;
    }
    else {
        LastServiceEndTime = 22;
    }

    console.log('cust_email:', cust_email);
    console.log('serviceId:', serviceId);
    console.log('approx_time:', approx_time);
    console.log('date:', SerDate);
    console.log('address:', address);
    console.log('city:', city);
    console.log('province:', province);
    console.log('zipcode:', zipcode);
    console.log('Total:', Total);

    console.log("reqBody", req.body);

    try {
        const empSerRecords = await empSerModel.find({ ser_id });
        const empEmails = empSerRecords.map(record => record.emp_Email);

        let orderEmpEmails;

        console.log("Employee record service table", empSerRecords);
        console.log("Employee Emails", empEmails);



        const orderRecords = await OrderModel.find({ SerId, order_Status , SerDate });
        console.log("order table records", orderRecords);

        if (orderRecords.length != 0) {
            orderEmpEmails = orderRecords.map(record => record.emp_Email);

            console.log("Employee record order table", orderEmpEmails);


            const firstUniqueEmail = empEmails.find(email => !orderEmpEmails.includes(email));
            console.log("Unique Email", firstUniqueEmail);

            if (firstUniqueEmail != undefined) {
                const emp_Email = firstUniqueEmail;
                const SerId = serviceId;
                const cust_Email = cust_email;
                const Address = address;
                const City = city;

                const ZipCode = zipcode;
                const Province = province;
                const SerDate = date;
                const SerStartTime = "9";
                const SerEndTime = 9 + approx_time;
                const BookedDate = new Date();
                const Amount = Total;
                const order_Status = "Pending";

                console.log("UNIQUE  IF  :", 'Emp Email:', emp_Email, 'Service ID:', SerId, 'Customer Email:', cust_Email, 'Address:', Address, 'City:', City, 'ZipCode:', ZipCode, 'Province:', Province, 'Service Date:', SerDate, 'Service Start Time:', SerStartTime, 'Service End Time:', SerEndTime, 'Booked Date:', BookedDate, 'Amount:', Amount, 'Order Status:', order_Status);



                const newOrder = await OrderModel.create({ emp_Email, SerId, cust_Email, Address, City, ZipCode, Province, SerDate, SerStartTime, SerEndTime, BookedDate, Amount, order_Status });
                res.json("Booked");

            }

            else {
                

let empEmailStructure = []; // Initialize the structure array

for (let i = 0; i < empEmails.length; i++) {
    empEmailStructure.push({
        index: i,
        emails: empEmails[i],
        ordercount: 0,
        orderid: -1
    });
}

console.log("st1",empEmailStructure);


console.log(empEmails.length, orderRecords.length);
for(i=0; i<empEmails.length;i++){

    for(j=0; j<orderRecords.length;j++){
        var nextsertime = parseInt(orderRecords[j].SerEndTime) + approx_time;
    
        if(empEmails[i] == orderRecords[j].emp_Email && nextsertime <= LastServiceEndTime ){
            
            empEmailStructure[i].ordercount+=1;
            empEmailStructure[i].orderid = j;
        }
    }
}



let minOrder = empEmailStructure[0].ordercount;
let minOrderCountId = empEmailStructure[0].orderid;

console.log("st2",empEmailStructure);

for (i = 0; i<empEmailStructure.length;i++){
    if(empEmailStructure[i].ordercount<minOrder){
        minOrder = empEmailStructure[i].ordercount;
        minOrderCountId = empEmailStructure[i].orderid;
    }
}

if(minOrder ==  empEmailStructure[0].ordercount ){
    minOrderCountId = empEmailStructure[0].orderid;
}


console.log("st3",empEmailStructure);


                const emp_Email = orderRecords[minOrderCountId].emp_Email;
                const SerId = serviceId;
                const cust_Email = cust_email;
                const Address = address;
                const City = city;
                const ZipCode = zipcode;
                const Province = province;
                const SerDate = date;
                const SerStartTime = orderRecords[minOrderCountId].SerEndTime;
                const SerEndTime = parseInt(orderRecords[minOrderCountId].SerEndTime) + approx_time; 
                const Amount = Total;
                const order_Status = "Pending";
              
                console.log("ORDER TRAVERS DATA:   ", 'Emp Email:', emp_Email, 'Service ID:', serviceId, 'Customer Email:', cust_email, 'Address:', address, 'City:', city, 'ZipCode:', zipcode, 'Province:', province, 'Service Date:', date, 'Service Start Time:',SerEndTime, 'Service End Time:', SerEndTime + approx_time, 'Booked Date:', new Date(), 'Amount:', Total, 'Order Status:', 'Pending');

                const newOrder = await OrderModel.create({ emp_Email, SerId, cust_Email, Address, City, ZipCode, Province, SerDate, SerStartTime, SerEndTime, BookedDate, Amount, order_Status });




res.json("Booked");









            }


        }
        else {

            const emp_Email = empEmails[0];
            const SerId = serviceId;
            const cust_Email = cust_email;
            const Address = address;
            const City = city;


            const ZipCode = zipcode;
            const Province = province;
            const SerDate = date;
            const SerStartTime = "9";
            const SerEndTime = 9 + approx_time;
            const BookedDate = new Date();
            const Amount = Total;
            const order_Status = "Pending";



            console.log("LAST ELSE : ", 'Emp Email:', empEmails[0], 'Service ID:', serviceId, 'Customer Email:', cust_email, 'Address:', address, 'City:', city, 'ZipCode:', zipcode, 'Province:', province, 'Service Date:', date, 'Service Start Time:', "9", 'Service End Time:', 9 + parseInt(approx_time), 'Booked Date:', new Date(), 'Amount:', Total, 'Order Status:', 'Pending');


            const newOrder = await OrderModel.create({ emp_Email, SerId, cust_Email, Address, City, ZipCode, Province, SerDate, SerStartTime, SerEndTime, BookedDate, Amount, order_Status });

            res.json("Booked");
        }

    } catch (error) {
        console.error("Error creating ORDER :", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;