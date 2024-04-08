import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import loginImage from '../Assets/login_img.jpg'
import '../Styles/ForgotPassword.css';



export const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const selectedOption = window.localStorage.getItem("loggedIn");

    const navigate = useNavigate();
   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   async function submit(e){
    e.preventDefault();

        if(email == ''){
            alert("please enter email");
            return;
        }
        else if(!emailRegex.test(email)){
            alert("Wrong Email Format");
            return;
        }


        
        try {

            await axios.post("http://localhost:8000/forgotpassword", {
                email,selectedOption
            })
                .then(res => {
                    if (res.data == "notexist") {
                        alert("Email Does Not Exist!"); 
                        return;
                    }
                    else{

                    alert("Email has been sent.\nPlease Check your inbox.");
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }



    }


    function goBack(){
navigate("/");
    }

  return (
    <div className='ForgotMain'>
             <div className='image'>
                
                <img className="AuthImage" src={loginImage}></img>
             </div>
        <div className='wrapper'>
        
            <form id="ForgotForm" action="POST" className='shadow-lg'>
                <button id='back' onClick={goBack}>
            <IoMdArrowRoundBack />
            </button>
                <h1>Forgot Password</h1>

                <div className='input-box'>
                    <input className='form-input' type='Email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    <MdAlternateEmail className='icon' />
                </div>


                <button className='btn' type='submit' onClick={submit}>
                    Send Email
                </button>

              

            </form>

        </div>
        </div>
  )
}
