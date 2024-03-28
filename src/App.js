
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import RegistrationForm from './Pages/RegistrationForm';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ServiceBooking } from "./Pages/CustomerPages/ServiceBooking";
import Home from "./Pages/CustomerPages/Home";
import { MyOrders } from "./Pages/CustomerPages/MyOrders";
import { Profile } from "./Pages/CustomerPages/Profile";




function App() {
 return(
    <div className="App">
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegistrationForm/>}/>
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
