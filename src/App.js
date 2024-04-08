
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import RegistrationForm from './Pages/RegistrationForm';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ServiceBooking } from "./Pages/CustomerPages/ServiceBooking";
import Home from "./Pages/CustomerPages/Home";
import { MyOrders } from "./Pages/CustomerPages/MyOrders";
import { Profile } from "./Pages/CustomerPages/Profile";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { EmpHome } from "./Pages/EmpPages/EmpHome";
import { EmpAllOrders } from "./Pages/EmpPages/EmpAllOrders";
import { AddEmp } from "./Pages/AdminPages/AddEmp";
// import { AllEmp } from "./Pages/AdminPages/AllEmp";
import { EditEmp } from "./Pages/AdminPages/EditEmp";








function App() {
 return(
    <div className="App">
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegistrationForm/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>

        <Route
  path="/*"
  element={
    <>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>} /> 
        <Route path="/service-booking/:id" element={<ServiceBooking/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/todaysOrders" element={<EmpHome/>}/>
        <Route path="/allOrders" element={<EmpAllOrders/>}/>
        <Route path="/addEmp" element={<AddEmp/>}/>
        {/* <Route path="/viewAllEmp" element={<AllEmp/>}/> */}
        <Route path="/editEmp" element={<EditEmp/>}/>

      </Routes>
      <Footer/>
    </>
  }
/>
      </Routes>
    </Router>

   
  </div>
 );    
}

export default App;
