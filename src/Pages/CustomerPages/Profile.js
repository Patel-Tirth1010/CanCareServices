import React from 'react'
import { useState, useEffect } from 'react';
import '../../Styles/CustomerPageStyles/Profile.css'
import axios from "axios";



export const Profile = () => {
    console.log("profile")

    let cust_Email = window.localStorage.getItem("cusEmail");

    const [formData, setFormData] = useState({
        FName: '',
        LName: '',
        email: '',
        Address: '',
        City: '',
        Province: '',
        ZipCode: ''
      });

    //   useEffect(() => {getProfileData()});
   

    //     const getProfileData = async () => {
    //         try {
    //           const response = await axios.post("http://localhost:8000/profile", {
    //             params: {
    //                 cust_Email 
    //             }
    //         });
    //         // setOrders(response.data);
    //         setFormData({
    //             FName: response.data.FName || '',
    //             LName: response.data.LName || '',
    //             email: response.data.email || '',
    //             Address: response.data.Address || '',
    //             City: response.data.City || '',
    //             Province: response.data.Province || '',
    //             ZipCode: response.data.ZipCode || ''
    //           });
    //     } catch (error) {
    //       console.error("Error fetching orders:", error);
    //     }
    //   };



      
useEffect(() => {
    const fetchProfile = async () => {
       try {
         const response = await axios.post("http://localhost:8000/profile", {
          cust_Email
       });
   
       setFormData({
                    FName: response.data.FName || '',
                    LName: response.data.LName || '',
                    email: response.data.email || '',
                    Address: response.data.Address || '',
                    City: response.data.City || '',
                    Province: response.data.Province || '',
                    ZipCode: response.data.ZipCode || ''
                  });
       } catch (error) {
         console.error("Error fetching orders:", error);
       }
     };
   
     fetchProfile();
   }, []);
     


      
  

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission to update customer data
        // You can perform validation and send updated data to the server here
        console.log('Form submitted with data:', formData);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    

  return (
   

    <div className='ProfileMain'>
        
        
<div id='title'>  
<p className='profileP'>Hey</p> <h1 id='profileh1'>{window.localStorage.getItem("userName")}</h1><p className='profileP'>, Update Your Profile Here</p> 
</div>
    <form id='custProfileForm' onSubmit={handleSubmit}>
                      
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-input" placeholder="FName" value={formData.FName} onChange={handleChange} />
                        <input type="text" className="form-input" placeholder="LName" value={formData.LName} onChange={handleChange} />
                        
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-input" placeholder="Email" value={formData.email} onChange={handleChange} />

                        
                                               
                        


                        <div className="address-group">
                            <label className="form-label">Enter Address:</label>
                            <input type="text" className="form-input" placeholder="Street Address" value={formData.Address} onChange={handleChange} />
                            {/* <span className='error'>{errors.streetAddress}</span> */}
                            <input type="text" className="form-input" placeholder="City" value={formData.City} onChange={handleChange} />
                            {/* <span className='error'>{errors.city}</span> */}
                            <input type="text" className="form-input" placeholder="Province" value={formData.Province} onChange={handleChange} />
                            {/* <span className='error'>{errors.state}</span> */}
                            <input type="text" className="form-input" placeholder="Postal Code" value={formData.ZipCode} onChange={handleChange} />
                            {/* <span className='error'>{errors.zipCode}</span> */}
                        </div>
                        <button type="submit" className="submit-button">Update</button>
                    </form>

                    </div>
  )
}


