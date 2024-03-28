import React from 'react';
import '../Styles/RegistrationForm.css';
import {useNavigate,Link} from "react-router-dom";
import { FaUserAlt,  FaLock, FaUnlock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import  {  useState } from "react";
import axios from "axios";
import RegistrationFormValidation from '../Components/registrationFormValidation.js';








export const RegistrationForm = () => {
    const navigate = useNavigate();

   
    const [FName,setFName]=useState('') 
    const [LName,setLName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhNum]=useState('')
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [errors, setErrors] = useState({})

    

    
    async function register(e){
      
        e.preventDefault();

        setErrors(RegistrationFormValidation(FName, LName, password, email));

        if(Object.keys(errors).length === 0){

        try{

            await axios.post("http://localhost:8000/register",{
             FName, LName, password, email, phone
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("Email already exist")
                }
                else{
                    window.localStorage.setItem("custEmail", res.data.email)
                    window.localStorage.setItem("loggedIn","cus");
                    window.localStorage.setItem("userName", res.data.FName);
                    console.log(res.data)
                    navigate("/home");
                }
            })
            .catch(e=>{
                navigate("/");
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }
    }
    else{
        return;
    }

    }




  return (
    <div className='Registarionform'>
    <div className='wrapper'>

        <form id='loginForm' action="Post">
            <h1>Register</h1>

            <div className='input-box'>
                <input type='text' onChange={(e)=>{setFName(e.target.value)}} placeholder='FirstName'/>
                <FaUserAlt  className='icon'/>
                <span className='error'>{errors.fName}</span>
            </div>

            <div className='input-box'>
                <input type='text' onChange={(e)=>{setLName(e.target.value)}} placeholder='LastName'/>
                <FaUserAlt  className='icon'/>
                <span className='error'>{errors.lName}</span>

            </div>
            

            <div className='input-box'>
                <input type='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
                <MdAlternateEmail  className='icon'/>
                <span className='error'>{errors.email}</span>
            </div>

            <div className='input-box'>
                <input type='tel' onChange={(e)=>{setPhNum(e.target.value)}} placeholder='PhoneNumber'/>
                <FaPhone  className='icon'/>
                
            </div>

            <div className='input-box'>
                <input type={visibility ? 'text' : 'password'} placeholder='Password' onChange={(e)=> setPassword(e.target.value)}  />
                <div onClick={()=>setVisibility(!visibility)}>{visibility ? <FaUnlock className='icon' /> : <FaLock className='icon' /> }</div>
                <span className='error'>{errors.password}</span>
            </div>

           
          

            <button type='submit' onClick={register}>
               Register
            </button>

            <div className="registration-link">
                    <p>Already have an acoount ? <Link to="/" className='link'>Go Sign In!</Link> </p>
                </div>


            

        </form>

   
        </div>
    </div>
  )
}

export default RegistrationForm;
