import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import '../../Styles/AdminPagesStyles/addEmp.css'



export const EditEmp = () => {

    const [SearchEmail, setSearchEmail] = useState('');







    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [password, setPassword] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Province, setProvince] = useState('');
    const [ZipCode, setZipCode] = useState('');
    const [notification, setNotification] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedValue, setSelecteValue] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [JoiningDateError, setJoiningDateError] = useState('');





    

      async function fetchEmployee(){

        try {
    
            const response = await axios.get("http://localhost:8000/getEmp", {
              params: {
                Email: SearchEmail,
              }
            });
            console.log("employee res data", response.data)


            if(response.data=="notexist"){
                alert(`Employee with this email: ${SearchEmail} does not exist`);
                return;
            }

            const profileData = response.data;
            console.log("employee profiledata", profileData)
            setFName(profileData.FName || '');
            setLName(profileData.LName || '');
            setEmail(profileData.Email||'');
            setPassword(profileData.Password);
            setPhoneNumber(profileData.Ph_No || '');
            
            setSelectedDate(new Date(profileData.JoiningDate).toISOString().split('T')[0]);
            console.log(new Date(profileData.JoiningDate).toISOString().split('T')[0]);
            setSelecteValue(profileData.serviceId);
            setAddress(profileData.Address || '');
            setCity(profileData.City || '');
            setProvince(profileData.Province || '');
            setZipCode(profileData.ZipCode || '');
          } catch (error) {
            console.error("Error fetching orders:", error);
          }

      }
    

    
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;


function handleSelect(option, value){

    setSelecteValue(value);
    setSelectedOption(option);
}




const handleSubmit = async (e) => {
    e.preventDefault();
  



    setEmailError('');
    setPasswordError('');
    setPhoneNumberError('');
    setJoiningDateError('');

 
    if (!email) {
        setEmailError('Email is required');
      return;
    }
    else if(!emailRegex.test(email)){
        setEmailError('Wrong email format');
        return;

    }
    if (!password) {
        setPasswordError('Password is required');
        return;

    }
    if (!selectedDate) {
        setJoiningDateError('Joining date is required');
        return;

    }






    try {
      // Make a PUT request to your backend API with the updated data
      const response = await axios.post("http://localhost:8000/getEmp/editEmployee", {
      
      SearchEmail:SearchEmail,  
        FName: FName,
        LName: LName,
        PhoneNumber:PhoneNumber,
        Email:email,
        password:password,
        JoiningDate:selectedDate,
        serviceId:selectedValue,
        Address: Address,
        City: City,
        Province: Province,
        ZipCode: ZipCode,
        order_count:0
      });

      if(response.data=="Updated"){
        
      setNotification('Employee Details Updated successfully!');
      setTimeout(() => {
        setNotification(null);

      }, 2000);
        return;
    }
    else{
        console.log("error",response.data);
}

 
     
    } catch (error) {
      // Handle error response
      console.error("Error Details Updated:", error);
      // Optionally, you can show an error message or handle the error in other ways
    }

  };





    return (

        <div className='ProfileMain '>

<div id='title'>
        <p className='profileP'>EditEmployee</p>
      </div>

      <div className='ordersFilterDiv shadow-lg'>
                <h2>Search Employee by Email:</h2>
                <input type="email" id="email" className="form-control" placeholder='xyz@xyz.com' value={SearchEmail} onChange={(e) => { setSearchEmail(e.target.value) }} />
                <button type="submit" className="submit-button" onClick={fetchEmployee}>Search Employee</button>
            </div>


            <div className="shadow-lg profileFormDiv">
                <form id='custProfileForm' onSubmit={handleSubmit} >

                    <label className="form-label profileLabel">Name:</label>
                    <input type="text" className="form-input profileInput" placeholder="FName" value={FName} onChange={(e) => setFName(e.target.value)} />
                    <input type="text" className="form-input profileInput" placeholder="LName" value={LName} onChange={(e) => setLName(e.target.value)} />

                    <label className="form-label profileLabel">Email:</label>
                    <input type="text" className="form-input profileInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className='error'>{emailError}</span>

                    <label className="form-label profileLabel">Password:</label>
                    <input type="text" className="form-input profileInput" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />


                    <label className="form-label profileLabel">PhoneNumber:</label>
                    <input type="Number" className="form-input profileInput" placeholder="PhoneNumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <span className='error'>{phoneNumberError}</span>

                    <label className="form-label profileLabel">JoiningDate:</label>
                    <input type="date" id="Joiningdate" className="form-control" placeholder='dd-mm-yyyy' value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value) }} />
                    <span className='error'>{JoiningDateError}</span>


                    <Dropdown id='serviceDropdown'>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {selectedOption || "Select Service"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu id='dropDownMenu'>
                            <Dropdown.Item value="1" className='dropDownItem'  onClick={() => handleSelect("Kitchen Cleaning", "1")}>Kitchen Cleaning</Dropdown.Item>
                            <Dropdown.Item value="2" className='dropDownItem' onClick={() => handleSelect("Hair Cutting", "2")}>Hair Cutting</Dropdown.Item>
                            <Dropdown.Item value="3" className='dropDownItem' onClick={() => handleSelect("Driveway Cleaning", "3")}>Driveway Cleaning</Dropdown.Item>
                            <Dropdown.Item value="4" className='dropDownItem' onClick={() => handleSelect("Pest Control", "4")}>Pest Control</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="address-group ">
                        <label className="form-label profileLabel ">Enter Address:</label>
                        <input type="text" className="form-input profileInput" placeholder="Street Address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        {/* <span className='error'>{errors.streetAddress}</span> */}
                        <input type="text" className="form-input profileInput" placeholder="City" value={City} onChange={(e) => setCity(e.target.value)} />
                        {/* <span className='error'>{errors.city}</span> */}
                        <input type="text" className="form-input profileInput" placeholder="Province" value={Province} onChange={(e) => setProvince(e.target.value)} />
                        {/* <span className='error'>{errors.state}</span> */}
                        <input type="text" className="form-input profileInput" placeholder="Postal Code" value={ZipCode} onChange={(e) => setZipCode(e.target.value)} />
                        {/* <span className='error'>{errors.zipCode}</span> */}
                    </div>
                    <button type="submit  " className="submit-button ">Update Employee</button>
                </form>

            </div>

            {notification && (
                <div className="notification">
                    <p>{notification}</p>
                    <div className="loading-bar" />
                </div>
            )}

        </div>

    )
}
