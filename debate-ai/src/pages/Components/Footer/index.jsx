import React, { useRef } from "react";
import Logo from "../Footer/logo.png";
import "./index.css"; // Make sure to include your CSS file

const Footer = () => {
    const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      window.scrollTo({
        behavior: "smooth", // Smooth scrolling
        top: sectionRef.current.offsetTop, // Scroll to the top of the section
      });
    }
}

  return (
    <div className="footer-wrapper">
      <div className="container">
        <div className="row">
            <h1>ArguMentor</h1>
            <h3 className="pt-4">Your Virtual AI Debate Coach</h3>
          <div className="col-md-3 footer-section-one pt-5">
            <div className="footer-logo-container">
              <img src={Logo} alt="" />
            </div>
          </div>
          <div className="col-md-9 footer-section-two" ref={sectionRef}>
            <div className="footer-divider"></div>
            <div className="footer-section-columns">
              <a href="#home">Home</a>
              <a href="debate">Practice</a>
              <a href="evifinder">EviFinder</a>
              <a href="#testimonals">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section-columns">
              <span>(925) 307-9355</span>
              <span>nikhilprabhu06@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
