import React from 'react'
import { useState, useEffect } from 'react';
import '../../Styles/CustomerPageStyles/Profile.css'
import axios from "axios";

import { useNavigate } from "react-router-dom";



export const Profile = (
) => {

  const navigate = useNavigate();


    console.log("profile")

    let custEmail = window.localStorage.getItem("custEmail");

  
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Province, setProvince] = useState('');
    const [ZipCode, setZipCode] = useState('');
    const [notification, setNotification] = useState(null);



      
useEffect(() => {
    const fetchProfile = async () => {
    
       try {
         
         const response = await axios.get("http://localhost:8000/profile", {
          params: {
            custEmail: custEmail 
        }
       });
       const profileData = response.data;
       setFName(profileData.FName || '');
       setLName(profileData.LName || '');
       setEmail(profileData.email || '');
       setAddress(profileData.Address || '');
       setCity(profileData.City || '');
       setProvince(profileData.Province || '');
       setZipCode(profileData.ZipCode || '');
       } catch (error) {
         console.error("Error fetching orders:", error);
       }
     };
   
     fetchProfile();
   }, []);
     



    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log("hey");
        try {
          // Make a PUT request to your backend API with the updated data
          const response = await axios.put("http://localhost:8000/profile/update", {
              custEmail: custEmail,
              FName: FName,
              LName: LName,
              email: email,
              Address: Address,
              City: City,
              Province: Province,
              ZipCode: ZipCode
          });
  
          // Handle success response
          console.log("Profile updated successfully:", response.data);
          window.localStorage.setItem("userName",response.data.FName);

          setNotification('Profile Updated successfully!');
          setTimeout(() => {
            setNotification(null);
            navigate("/home"); // Hide notification after 5 seconds
          }, 2000);
          // Optionally, you can perform additional actions such as showing a success message or updating local state
      } catch (error) {
          // Handle error response
          console.error("Error updating profile:", error);
          // Optionally, you can show an error message or handle the error in other ways
      }

      };

    

  return (
   

    <div className='ProfileMain'>
        
        
<div id='title'>  
<p className='profileP'>Hey</p> <h1 id='profileh1'>{window.localStorage.getItem("userName")}</h1><p className='profileP'>, Update Your Profile Here</p> 
</div>
    <form id='custProfileForm' onSubmit={handleSubmit}>
                      
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-input" placeholder="FName"  value={FName} onChange={(e) => setFName(e.target.value)}  />
                        <input type="text" className="form-input" placeholder="LName"  value={LName} onChange={(e) => setLName(e.target.value)}  />
                        
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  />

                        
                                               
                        


                        <div className="address-group">
                            <label className="form-label">Enter Address:</label>
                            <input type="text" className="form-input" placeholder="Street Address" value={Address} onChange={(e) => setAddress(e.target.value)}/>
                            {/* <span className='error'>{errors.streetAddress}</span> */}
                            <input type="text" className="form-input" placeholder="City" value={City} onChange={(e) => setCity(e.target.value)} />
                            {/* <span className='error'>{errors.city}</span> */}
                            <input type="text" className="form-input" placeholder="Province" value={Province} onChange={(e) => setProvince(e.target.value)} />
                            {/* <span className='error'>{errors.state}</span> */}
                            <input type="text" className="form-input" placeholder="Postal Code" value={ZipCode} onChange={(e) => setZipCode(e.target.value)} />
                            {/* <span className='error'>{errors.zipCode}</span> */}
                        </div>
                        <button type="submit" className="submit-button">Update</button>
                    </form>

                    {notification && (
        <div className="notification">
          <p>{notification}</p>
          <div className="loading-bar" />
        </div>
      )}

                    </div>
  )
}


export default Profile;