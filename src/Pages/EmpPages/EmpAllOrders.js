import React from 'react'
import '../../Styles/EmployeePageStyles/EmpAllOrders.css'
import axios from 'axios';
import { useEffect, useState } from "react";
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

export const EmpAllOrders = () => {


    const empEmail = window.localStorage.getItem("empEmail");

    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const [selectedDate, setSelectedDate] = useState('');
    const [empty, setEmpty] = useState(false);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8000/allOrders", {
                    params: {
                        empEmail: empEmail,
                        date: ""
                    }
                });
                console.log("ordersResponse1",response.data);
               

                setPendingOrders(response.data.ordersPending);
                setCompletedOrders(response.data.ordersCompleted);

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


    async function fliterRecords() {


        try {
            const response = await axios.get("http://localhost:8000/allOrders", {
                params: {
                    empEmail: empEmail,
                    date: selectedDate
                }
            });
            setPendingOrders(response.data);
            if (Array.isArray(response.data) && response.data.length === 0) {
                setEmpty(true);
                return;

            }
            setEmpty(false);


        } catch (error) {
            console.error("Error fetching orders:", error);
        }



    }

    return (
        <div className='EmpHomeMain'>


            <div className='ordersFilterDiv shadow-lg'>
                <h2>Filter Orders by date:</h2>
                <input type="date" id="date" className="form-control" placeholder='dd-mm-yyyy' value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value) }} />
                <button type="submit" className="submit-button" onClick={fliterRecords}>Filter</button>
            </div>


            {empty && (
                <div className=' shadow-lg emptyDiv'>
                    <h1>Sorry, No Orders For This Date. 😢</h1>
                </div>
            )}
            <div className="cards-container ">
                {pendingOrders.map((order) => (
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
                                <p className='secondheading'>{new Date(new Date(order.SerDate).getTime() + new Date(order.SerDate).getTimezoneOffset() * 60000).toISOString().split('T')[0]
                                }</p>
                                <p className='secondheading'>{order.SerStartTime}:00 - {order.SerEndTime}:00</p>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                ))}


{completedOrders.map((order) => (
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
                                <p className='secondheading'>{new Date(new Date(order.SerDate).getTime() + new Date(order.SerDate).getTimezoneOffset() * 60000).toISOString().split('T')[0]
                                }</p>
                                <p className='secondheading'>{order.SerStartTime}:00 - {order.SerEndTime}:00</p>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                ))}
            </div>


        </div>

    )
}
