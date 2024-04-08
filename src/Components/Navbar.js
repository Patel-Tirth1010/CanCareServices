import React, { useEffect,useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Container,
  Form,
  FormControl,
  Nav,
 
  NavDropdown,
} from "react-bootstrap";
import logo from "../Assets/logo.png"

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
  const location = useLocation();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  function logoutHandler(){
  

   const logout = window.confirm("Do you Want To LogOut?");
if(logout){
    window.localStorage.removeItem("cusEmail");
    window.localStorage.removeItem("loggedIn");
    window.localStorage.clear();
    navigate("/");
}
else
return;
  
  }
  

  const isActive = (path) => {
    return location.pathname === path;
  };
 


  return (
    <div className="navbar bg-grad shadow" >
      <div className="logo"><img src={logo}></img></div>

      
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
        <Link to="/todaysOrders"  style={isActive("/todaysOrders") ? { color: "blue" } : { color: "black" }}>Todays Orders</Link>
        {console.log("is",isActive("/todaysOrders"))}
          <Link to="/allOrders">All Orders</Link>
          
        </>
      )}

{admin && (
        <>
        <Link to="/AddEmp">Add Employee</Link>
          {/* <Link to="/AllEmp">All Employees</Link> */}
          <Link to="/AllEmp">Update Employee</Link>
        </>
      )}
          
        </div>
       
      </div>
      <div className="rightSide">
      {console.log("cus",customer)}


      {customer && (
        <>
          <Link to="/home" style={isActive("/home") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}>Home</Link>
          <Link to="/myorders" style={isActive("/myorders") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}>My Orders</Link>
          <Link to="/contact" style={isActive("/contact") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}>Contact</Link>
        </>
      )}

{employee && (
        <>
        <Link to="/todaysOrders" style={isActive("/todaysOrders") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }} >Todays Orders</Link>
          <Link to="/allOrders" style={isActive("/allOrders") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }} >All Orders</Link>
          
        </>
      )}
      {admin && (
        <>
        <Link to="/addEmp" style={isActive("/AddEmp") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}>Add Employee</Link>
          {/* <Link to="/viewAllEmp" style={isActive("/AllEmp") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}>All Employees</Link> */}
          <Link to="/editEmp" style={isActive("/AllEmp") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}>Update Employee</Link>
        </>
      )}
        
      
        <Link to="/profile" style={isActive("/profile") ? { color: "#2857f5", fontWeight: 800, fontSize:40 } : { color: "black" }}> {window.localStorage.getItem("userName")}</Link>      
        <a onClick={logoutHandler}> Logout</a>        
                 
                 
       
      </div>
      <button className="navbarButton" onClick={toggleNavbar}>
        <RxHamburgerMenu className="burgerIcon" />
        </button>
      <hr></hr>
    </div>
  );
}

export default Navbar;