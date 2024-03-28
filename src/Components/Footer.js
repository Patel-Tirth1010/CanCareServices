import React from "react";
import '../Styles/Footer.css';
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



function Footer() {
  return (
    <div className="footer bg-grad">
      <div className="socialMedia">
        <FaInstagramSquare  /> <FaTwitter /> <FaFacebook /> <FaLinkedin />

      </div>
      <p> &copy; 2024 CanCareServices.com</p>
    </div>
  );
}

export default Footer;