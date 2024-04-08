import React from 'react';
import '../Styles/LoginForm.css';
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import RadioButtonGroup from '../Components/radioButtonGroup';






export const LoginForm = () => {

    const navigate = useNavigate();
axios.defaults.withCredentials = true;
    
    // useEffect(() => {
    //     // Check session upon component load
    //     axios.get("http://localhost:8000/login/session-status")
    //     .then(res => {
    //         console.log("response",res.data);
    //         if (res.data === 'loggedIn') {
    //             navigate("/home"); // Redirect if logged in
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error checking session status:", error);
    //         });
    // }, [navigate]);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [selectedOption, setSelectedOption] = useState('Customer');
    const [EmailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
    async function submit(e) {
        e.preventDefault();
       
        
        setEmailError('');
        setPasswordError('');

        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        }
        else if(!emailRegex.test(email)){
            setEmailError('Wrong email format');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }

        
        if (!isValid) {
            return;
        }

        try {

            await axios.post("http://localhost:8000/login", {
                email,password,selectedOption
            })
                .then(res => {
                    if (res.data == "notexist") {
                       
                        alert("User have not sign up")
                        
                    }
                    else  {
                        window.localStorage.setItem("userName", res.data.FName);
                        console.log("login response", res.data)
                        
                        if(selectedOption=="Customer"){
                            window.localStorage.setItem("custEmail", email)
                            window.localStorage.setItem("loggedIn","cus");
                            navigate("/home");

                           }
                           else if(selectedOption=="Employee"){
                            window.localStorage.setItem("empEmail", email)
                            window.localStorage.setItem("loggedIn","emp");
                            navigate("/home");

                           }
                           else if(selectedOption=="Admin"){
                            window.localStorage.setItem("adminEmail", email)
                            window.localStorage.setItem("loggedIn","admin");
                            navigate("/home");
                           }

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


    

    function handleChange(event) {
        setSelectedOption(event.target.value);
      }



    return (

        

        <div className='loginform'>
        <div className='wrapper'>

            <form id="loginForm" action="POST">
                <h1>Login</h1>
               
                <RadioButtonGroup selectedOption={selectedOption} handleChange={handleChange} />

                <div className='input-box'>
                    <input type='Email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    <MdAlternateEmail className='icon' />
                    <span className='error'>{EmailError}</span>
                </div>

                <div className='input-box'>
                    <input type={visibility ? 'text' : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    <div onClick={() => setVisibility(!visibility)}>{visibility ? <FaUnlock className='icon' /> : <FaLock className='icon' />}</div>
                    <span className='error'>{passwordError}</span>
                </div>


                <div className='forgot-password'>
                    <Link className='link'>Forgot Password?</Link>
                </div>

                <button type='submit' onClick={submit}>
                    Login
                </button>

                <div className="registration-link">
                    <p>Don't have an acoount ? <Link to="/register" className='link'>Create One Here!</Link> </p>
                </div>

            </form>

        </div>
        </div>
    )
}

export default LoginForm;
