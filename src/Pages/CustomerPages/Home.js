import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/CustomerPageStyles/Home.css'
import img1 from '../../Assets/haircut.jpg'
import img2 from '../../Assets/cleaning.jpg'
import img3 from '../../Assets/officeclean.jpg'
import img4 from '../../Assets/cleanservice.png'
import img5 from '../../Assets/grooming.png'
import img6 from '../../Assets/driveway.png'
import img7 from '../../Assets/pest.png'




function Home() {

console.log("hey");
  return (
    <div className="home" >
      <section id="title" className="bg-grad">
      <div className="row p-4 align-items-center rounded-3  shadow-lg">
        <div className="col-lg-5 p-3 p-lg-5 pt-lg-3">
          <h1 >Welcome to CanCare Services.</h1>
          <p id="heading">Discover Convenience, Book with Confidence!</p>
        </div>
        <div className="col-lg-5 offset-lg-1 p-0 overflow-hidden  shadow-lg  Carousel ">
          <Carousel >
            <Carousel.Item>
              <img className="d-block w-100" src={img1} alt="First slide" style={{ height: "600px" }} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100"src={img2}alt="Second slide" style={{ height: "600px" }} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img3} alt="Third slide" style={{ height: "600px" }} />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </section>

   
     




      <div className="row  shadow-lg card-row  ">
        <div className="col-md-4  " >
          <div className="card">
            <Link to="/service-booking/1">
            <img className="cardimg" src={img4} alt="Placeholder Image" />
            </Link>
            <div className="card-content">
              <h3>Kitchen Cleaning</h3>
              <p>Book Your Service for Kitchen Cleaning</p>
            </div>
            
          </div>
        </div>

        <div className="col-md-4 card-container " >
          <div className="card">
          <Link to="/service-booking/2">
            <img className="cardimg" src={img5} alt="Placeholder Image" />
            </Link>
            <div className="card-content">
              <h3>HairCutting</h3>
              <p>Book Your HairCutting service Here.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 card-container">
          <div className="card">
          <Link to="/service-booking/3">
            <img className="cardimg" src={img6} alt="Placeholder Image" />
            </Link>
            <div className="card-content">
              <h3>Driveway Cleaning</h3>
              <p>Book A Service For cleaning your Driveway</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 card-container">
          <div className="card">
          <Link to="/service-booking/4">
            <img className="cardimg" src={img7} alt="Placeholder Image" />
            </Link>
            <div className="card-content">
              <h3>PestControl</h3>
              <p>Make your house free from bugs by booking our Pest Control service.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div> 
    
   
    
   
  );
  }

export default Home;