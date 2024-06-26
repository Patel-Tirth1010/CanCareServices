  import React from 'react'
  import '../../Styles/CustomerPageStyles/MyOrders.css'
  import axios from 'axios';
  import { useEffect, useState } from "react";
  import moment from 'moment-timezone';
  import { useNavigate } from 'react-router-dom';







export const MyOrders = () => {

const custEmail = window.localStorage.getItem("custEmail");
const [notification, setNotification] = useState(null);
const navigate = useNavigate();

const [orders, setOrders] = useState([]);


useEffect(() => {
    const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/myOrders", {
        params: {
            custEmail: custEmail 
        }
    });

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);

const cancelOrder = async (orderId) => {
  try {
   const response = await axios.put("http://localhost:8000/cancle",{
    orderId
   });

    console.log(response);
    setNotification('Order Canceled successfully!');
    setTimeout(() => {
      setNotification(null);
      navigate("/home"); // Hide notification after 5 seconds
    }, 2000);
   
  } catch (error) {
    console.error("Error cancelling order:", error);
  }
};


const isWithin24Hours = (serviceStartTime) => {
  const currentTime = moment();
  const serviceTime = moment(serviceStartTime);
  const difference = serviceTime.diff(currentTime, 'hours');
  return difference > 24;
};

    return (
       

        <div className='OrdersMain'>
       
        <h3></h3>
        <div className="cards-container ">
          {orders.map((order) => (
            <div key={order._id} className="row shadow-lg OrdersRow">
              <div className="col OrdersCol">
                <div className="column OrdersColumn">
                  <h2 className='heading serName'>{order.service[0]?.ser_Name}</h2>
                  <p id='empName'>{order.order_Status === 'Pending' ? 'will be done by' : 'done by'}<br></br> {order.employee[0]?.FName}  {order.employee[0]?.LName}</p>
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
                  <h2 className='heading'>{order.order_Status === 'Pending' ? 'Service Is On:' : 'Service Was On:'} </h2>
                  <p className='secondheading'>{(moment.utc(order.SerDate).tz(moment.tz.guess())).format('YYYY-MM-DD')}</p>
                  <p className='secondheading'>{order.SerStartTime}:00 - {order.SerEndTime}:00</p>
                </div>
              </div>
              <div>
                {order.order_Status === "Pending"  && isWithin24Hours(order.SerDate)  && (
                  <button type="button" className="btn btn-danger button" onClick={() => cancelOrder(order._id)}>Cancel</button>
                )}


              </div>
            </div>
          ))}
        </div>
        {notification && (
        <div className="delNotification">
          <p>{notification}</p>
          <div className="loading-bar" />
        </div>
      )}
        
      </div>



    )
}
