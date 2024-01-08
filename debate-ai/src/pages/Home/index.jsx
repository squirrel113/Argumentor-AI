import React, { useState, useEffect, useRef } from 'react';
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/home-banner-image.png";
import Navbar from "../Components/Header";
import { FiArrowRight } from "react-icons/fi";
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import PickMeals from "../assets/pick-meals-image.png";
import ChooseMeals from "../assets/choose-image.png";
import DeliveryMeals from "../assets/delivery-image.png";
import ProfilePic from "../assets/fallon.png";
import { AiFillStar } from "react-icons/ai";
import Footer from "../Components/Footer";
import Popup from '../Components/Popup';
import emailjs from '@emailjs/browser';


const Home = () => {
  const workInfoData = [
    {
      image: ChooseMeals,
      title: "AI Web Scraper for Evidence",
      text: "Our AI web scraper fetches evidence, explanations, and impact analysis for well-rounded arguments.",
    },
    {
      image: DeliveryMeals,
      title: "AI Speech Practice Tool",
      text: "Refine your speech with AI tools that track eye contac and  stuttering to provide valuable feedback.",
    },
    {
      image: PickMeals,
      title: "Realtime Argument Feedback",
      text: "Utilize our virtual debate coach to recieve feedback to improve your arguments during tournaments.",
    },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [errors, setErrors] = useState({
    email: '',
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_87npufc', 'template_zuwovqv', e.target, 'xW6Su-GZRwwrVcWvj') 
      .then(
        (result) => {
          console.log(result.text);
          
        },
        (error) => {
          console.log(error.text);
        }
      );
      setEmail("");

  };

  return (
    <div id="home" className="home-container container-fluid">
      <div className="home-banner-container d-flex align-items-center">
        <div className="col-md-6 home-bannerImage-container col-md-6">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-start px-5">
          <h1 className="primary-heading">
            Empower Your Debating Skills with AI
          </h1>
          <p className="primary-text">
            Join the AI debate app that offers web scraping, speech practice, and more.
          </p>
          <button className="secondary-button" onClick={openPopup}>
            Get Started <FiArrowRight />{" "}
          </button>

          <Popup isOpen={isPopupOpen} onClose={closePopup}>

      </Popup>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>

      <div className="about-section-container d-flex align-items-center">
        <div className="about-background-image-container img-fluid">
          <img src={AboutBackground} alt="" />
        </div>
        <div className="row">
          <div className="col-md-4 about-section-image-container">
            <img src={AboutBackgroundImage} alt="" />
          </div>
          <div className="col-md-8 about-section-text-container">
            <p className="primary-subheading">About Us</p>
            <h1 className="primary-heading">
              Equalizing the Playing Field with Tech
            </h1>
            <p className="primary-text">
              Modern day debate training is unaffordable and exclusive for most. This is where ArguMentor comes in.
            </p>
            <div className="about-buttons-container">
              <button className="watch-video-button">
                <BsFillPlayCircleFill /> Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="work-section-wrapper">
        <div className="work-section-top text-align-center">
          <p className="primary-subheading">Features</p>
          <h1 className="primary-heading">App Key Features</h1>
          <p className="primary-text">
            Explore the powerful features that make our debate app stand out.
          </p>
        </div>
        <div className="work-section-bottom">
          {workInfoData.map((data) => (
            <div className="work-section-info" key={data.title}>
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="testimonials" className="work-section-wrapper">
        <div className="work-section-top">
          <p className="primary-subheading">Testimonials</p>
          <h1 className="primary-heading" style={{ textAlign: "center" }}>What Users Are Saying</h1>
          <p className="primary-text">
            Hear from a multitude of students that have utilized our application. 
          </p>
        </div>
        <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" style={{ maxHeight: 190}} />
          <p>
            "I used it for my cases and my arguments, and won my rounds with the help of the app."
          </p>
          <div className="testimonials-stars-container">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2>Anay - Fallon Middle School Debater</h2>
        </div>
      </div>
            <hr></hr>
      <div id="contact" className="contact-page-wrapper">
        <h1 className="primary-heading">Have Questions in Mind?</h1>
        <h1 className="primary-heading">Let Us Help You</h1>
        <div className="contact-form-container justify-content-center">
  <form onSubmit={sendEmail} className='justify-content-center d-flex'>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="Your Email Address"
        
      />
      <button type="submit" className="secondary-button">
        Submit
      </button>
  </form>
  {errors.email && <div className="error-message">{errors.email}</div>}
</div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
