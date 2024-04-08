import React from 'react'
import '../../Styles/EmployeePageStyles/EmpHome.css'
import axios from 'axios';
import { useEffect, useState } from "react";
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

export const EmpHome = () => {

    
const empEmail = window.localStorage.getItem("empEmail");
const [notification, setNotification] = useState(null);
const [empty, setEmpty] = useState(false);

const navigate = useNavigate();

const [orders, setOrders] = useState([]);


useEffect(() => {
    const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todaysOrders", {
        params: {
            empEmail: empEmail 
        }
    });

    setOrders(response.data);
    if (Array.isArray(response.data) && response.data.length === 0) {
      setEmpty(true);
      return;
  }
  setEmpty(false);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);

const finishOrder = async (orderId, cust_Email, emp_Email, ser_Id) => {
  try {
   const response = await axios.put("http://localhost:8000/todaysOrders/completed",{
    orderId, cust_Email, emp_Email, ser_Id
   });

    console.log(response);
    setNotification('Order Completed successfully!');
    setTimeout(() => {
      setNotification(null);
   window.location.reload();
      // Hide notification after 5 seconds
    }, 2000);
   
  } catch (error) {
    console.error("Error Finishing the order:", error);
  }
};





  return (
    <div className='EmpHomeMain'>
       
       {empty && (
                <div className=' shadow-lg emptyDiv'>
                    <h1>Sorry, No Orders For Today.</h1>
                </div>
            )}

    <div className="cards-container ">
      {orders.map((order) => (
        <div key={order._id} className="row shadow-lg OrdersRow">
          <div className="col EmpOrdersCol">
            <div className="column EmpOrdersColumn">
              <p id='customerName'> {order.customer[0]?.FName}  {order.customer[0]?.LName}</p>
              <p id='customerPhone'> Ph No: {order.customer[0]?.PhoneNumber}</p>
              <p id='customerAddress'> {order.Address}, {order.City}, {order.Province} {order.ZipCode} </p>

              <p className='secondheading'>Base Price:{order.service[0]?.price} <br></br>Total:${order.Amount}</p>
            </div>
          </div>
          <div className="col">
            <div className="column">
              <h2 className='heading'>Status</h2>
              <p className='secondheading' style={{ color: order.order_Status === "Pending" ? '#5d6ade' : 'green' }}>{order.order_Status}</p>
            </div>
          </div>
          <div className="col">
            <div className="column">
                <h2 className='heading serName'>{order.service[0]?.ser_Name}</h2>
              <h2 className='serheading'>{order.order_Status === 'Pending' ? 'Service Is On:' : 'Service Was On:'} </h2>
              <p className='secondheading'>{(moment.utc(new Date()).tz(moment.tz.guess())).format('YYYY-MM-DD')}</p>
              <p className='secondheading'>{order.SerStartTime}:00 - {order.SerEndTime}:00</p>
            </div>
          </div>
          <div>
            {order.order_Status === "Pending" && (
              <button type="button" className="btn btn-success empHomebutton" onClick={() => finishOrder(order._id, order.cust_Email, order.emp_Email, order.SerId)}>Completed the service</button>
            )}


          </div>
        </div>
      ))}
    </div>
    {notification && (
    <div className="successNotification">
      <p>{notification}</p>
      <div className="loading-bar" />
    </div>
  )}
    
  </div>

  )
}
