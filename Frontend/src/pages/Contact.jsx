// src/pages/Contact.jsx
import React from "react";
import "./Contact.css"; // ✅ CSS import

const Contact = () => {
  // ✅ Submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We’ll get back to you shortly.");
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        Email:{" "}
        <a href="mailto:support@flightbookingss.com">
          support@flightbookingss.com
        </a>
      </p>
      <p>
        Phone: <a href="tel:+254700123456">+254 700 123 456</a>
      </p>
      <p>Address: Nairobi, Kenya</p>

      <div className="map-container">
        <iframe
          title="FMS Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.214775359035!2d36.8064956!3d-1.2920654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10dff6d71c67%3A0xf6025a68e6d0abf2!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1687197397493!5m2!1sen!2ske"
          width="100%"
          height="300"
          style={{ border: 0, marginTop: "1rem", borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* ✅ Form with submission logic */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
