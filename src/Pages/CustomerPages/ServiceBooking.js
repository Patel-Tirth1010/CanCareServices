import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/CustomerPageStyles/ServiceBooking.css'
import img1 from '../../Assets/kitchen.png'
import img5 from '../../Assets/grooming.png'
import img2 from '../../Assets/cleanservice.png'
import img6 from '../../Assets/driveway.png'
import img7 from '../../Assets/pest.png'


import ServiceBookingFormValidation from '../../Components/serviceBookingValidation';
import axios from 'axios';




export const ServiceBooking = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    let serviceName;
    let serviceInfo = '';
    let serviceImage;
    let baseCost;

    // Define dummy information for each service
    const serviceData = {
        1: {
            name: "Kitchen cleaning",
            info: [
                "Includes cleaning of countertops",
                "Includes cleaning of stove and oven",
                "Includes cleaning of sink and faucet",
            ],
            approx_time: 3,
            price: 150,
            image:img1
        },
        2: {
            name: "Hair cutting",
            info: [
                "Includes hair wash",
                "Includes haircut and styling",
                "Includes blow dry"
            ],
            approx_time: 2,
            price: 50,
            image:img5
        },

        3: {
            name: "Driveway cleaning",
            info: [
                "Includes pressure washing of driveway",
                "Includes removal of dirt and stains",
                "Includes surface sealing if requested"
            ],
            approx_time: 3,
            price: 200,
            image:img6
        },
        4: {
            name: "Pest control",
            info: [
                "Includes inspection of premises",
                "Includes treatment of affected areas",
                "Includes follow-up visit if needed"
            ],
            approx_time: 4,
            price: 500,
            image:img7
        }
    };

    // Set service name and information based on ID
    if (id in serviceData) {
        serviceName = serviceData[id].name;
        serviceImage = serviceData[id].image;
        baseCost = serviceData[id].price;
        serviceInfo = serviceData[id].info.map((item, index) => (
            <li key={index}>{item}</li>
        ));
    }
    const [notification, setNotification] = useState(null);

    const [showSummary, setShowSummary] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [tax, settax] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [errors, setErrors] = useState({})


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();


        setErrors(ServiceBookingFormValidation(selectedDate, streetAddress, city, state, zipCode));

        if (Object.keys(errors).length == 0) {


            // Calculate estimated cost based on input values
             // Base cost for kitchen cleaning service
            let Tax = baseCost * 0.13; // No additional services
            let totalCost = baseCost + Tax;


            settax(Tax);

           
            setEstimatedCost(totalCost);
            setShowSummary(true);
        }
        else {
            return;
        }
    };

    // Function to handle date selection
    const handleDateChange = (e) => {
        const selectedDateTime = e.target.value;
        const selectedDate = new Date(selectedDateTime);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            setSelectedDate(selectedDateTime);
        } else {
            setSelectedDate('');
            alert('Please select a future date.');
        }
    };


    async function placeOrder(e) {
        e.preventDefault()

        try {

            var cust_Email = window.localStorage.getItem("custEmail");
            // cust_email, serviceId, approx_time, date, address, city, province, zipcode 
            var time = serviceData[id].approx_time;
            await axios.post("http://localhost:8000/placeOrder", {
                cust_Email, id, time, selectedDate, streetAddress, city, state, zipCode, estimatedCost
            })
                .then(res => {
                    if (res.data == "Booked") {
                        setNotification('Order placed successfully!');
                        setTimeout(() => {
                          setNotification(null);
                          navigate("/home"); // Hide notification after 5 seconds
                        }, 2000);

                        
                    }
                    else {
                        alert("error")
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })


            console.log('Customer Email:', cust_Email, 'ID:', id, 'Time:', time, 'Selected Date:', selectedDate, 'Street Address:', streetAddress, 'City:', city, 'State:', state, 'Zip Code:', zipCode);


        }
        catch (e) {
            console.log(e);

        }
    }

    return (
        <div className='main'>
            <section id="title" className='bg-grad'>
                <div className="row p-4 align-items-center rounded-3 serviceRow">
                    <div className="col-lg-4 p-3 p-lg-5 pt-lg-3 title-info">
                        <h1>Book Your Service</h1>
                        <h2>{window.localStorage.getItem("custEmail")}</h2>
                        <p id="heading">{serviceName}</p>
                        <ul className='info' >
                            {serviceInfo}
                        </ul>
                    </div>
        
                    <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden " >
                        <img src={serviceImage} alt="First slide" />
                    </div>


                </div>
            </section>

            <div className="cleaning-service-form row p-4 ">
                <div className="col-lg-6 ">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="date">Select Date:</label>
                            <input type="date" id="date" className="form-input"  value={selectedDate} onChange={handleDateChange} />
                           
                            <span className='error'>{errors.selectedDate}</span>
                        </div>
                        <div className="address-group">
                            <label className="form-label">Enter Address:</label>
                            <input type="text" className="form-input" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                            <span className='error'>{errors.streetAddress}</span>
                            <input type="text" className="form-input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                            <span className='error'>{errors.city}</span>
                            <input type="text" className="form-input" placeholder="Province" value={state} onChange={(e) => setState(e.target.value)} />
                            <span className='error'>{errors.state}</span>
                            <input type="text" className="form-input" placeholder="Postal Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                            <span className='error'>{errors.zipCode}</span>
                        </div>
                        <button type="submit" className="submit-button">Calculate Cost</button>
                    </form>
                </div>
                <div className="col-lg-6 ">

                    {showSummary && (
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <p>Service: {serviceName}</p>
                            <p>Date: {selectedDate}</p>
                            <p>Address: {streetAddress}, {city}, {state}, {zipCode}</p>
                            <p>Tax: {tax}</p>

                            <p>Estimated Cost: ${estimatedCost}</p>

                            <button id="placeOrder" type='submit' onClick={placeOrder}>
                                Place Order
                            </button>

                            {notification && (
        <div className="notification">
          <p>{notification}</p>
          <div className="loading-bar" />
        </div>
      )}

                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}

export default ServiceBooking;
