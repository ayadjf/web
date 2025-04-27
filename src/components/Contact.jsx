import React from 'react';
import './Contact.css';

function ContactPage() {
  return (
    <div className="contact-card">
      <div className="contact-card-content">
        <h2>Contact us:</h2>
        <p>+1-555-505-5050</p>
        <p>Kuizu@gmail.com</p>
        <p>Oued Smar, Algiers, Algeria</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-telegram-plane"></i></a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
