import React, { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Container,
  Form,
  FormControl,
  Nav,
 
  NavDropdown,
} from "react-bootstrap";

import '../Styles/Navbar.css';


function Navbar() {
  const [customer, setCustomer] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Check user role when the component mounts
    Check();
  }, []);


  function Check() {
   
let loggedIn = window.localStorage.getItem("loggedIn");
console.log(loggedIn);

if (loggedIn === "cus") {
  setCustomer(true);
  setEmployee(false);
  setAdmin(false);
} else if (loggedIn === "emp") {
  setCustomer(false);
  setEmployee(true);
  setAdmin(false);
} else if (loggedIn === "admin") {
  setCustomer(false);
  setEmployee(false);
  setAdmin(true);
}
console.log(customer);


  }





  const [openLinks, setOpenLinks] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  function logoutHandler(){

    window.localStorage.removeItem("cusEmail");
    window.localStorage.removeItem("loggedIn");
    window.localStorage.clear();
    navigate("/");
  
  }
 


  return (
    <div className="navbar bg-grad shadow" >
      
      <div className="leftSide" id={openLinks ? "open" : "close"}>
      
        <div className="hiddenLinks">
       
         {console.log("cus",customer)}

        {customer && (
        <>
          <Link to="/home">Home</Link>
          <Link to="/myorders">My Orders</Link>
          <Link to="/contact">Contact</Link>
        </>
      )}
      {employee && (
        <>
        <Link to="/todaysOrders">Todays Orders</Link>
          <Link to="/allOrders">All Orders</Link>
          
        </>
      )}

{admin && (
        <>
        <Link to="/AddEmp">Add Employee</Link>
          <Link to="/AllEmp">All Employees</Link>
          <Link to="/AllEmp">Update Employee</Link>
        </>
      )}
          
        </div>
       
      </div>
      <div className="rightSide">
      {console.log("cus",customer)}

      {customer && (
        <>
          <Link to="/home">Home</Link>
          <Link to="/myorders">My Orders</Link>
          <Link to="/contact">Contact</Link>
        </>
      )}

{employee && (
        <>
        <Link to="/todaysOrders">Todays Orders</Link>
          <Link to="/allOrders">All Orders</Link>
          
        </>
      )}
      {admin && (
        <>
        <Link to="/AddEmp">Add Employee</Link>
          <Link to="/AllEmp">All Employees</Link>
          <Link to="/AllEmp">Update Employee</Link>
        </>
      )}
        <NavDropdown title={window.localStorage.getItem("userName")}   id="collasible-nav-dropdown">
        <NavDropdown.Item >  
        <Link to="/profile">  My Profile</Link>      
                  
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
        </NavDropdown>
        <button onClick={toggleNavbar}>
        <RxHamburgerMenu className="burgerIcon" />
        </button>
      </div>
      <hr></hr>
    </div>
  );
}

export default Navbar;