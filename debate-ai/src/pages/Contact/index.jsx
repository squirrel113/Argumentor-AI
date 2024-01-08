import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formData = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_87npufc'
    , 'template_zuwovqv', formData.current, 'xW6Su-GZRwwrVcWvj')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

  }

  const sendEmailtoPerson = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_87npufc', 'template_zuwovqv', formData.current, 'xW6Su-GZRwwrVcWvj')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

  }

  const [errors, setErrors] = useState({
    email: '',
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 

  

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" ref={formData} onSubmit={sendEmail}>
        <label htmlFor="from_name">Name:</label>
        <input
          type="text"
          id="from_name"
          name="from_name"
          value={formData.from_name}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={validateEmail}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
