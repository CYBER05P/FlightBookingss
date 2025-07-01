// src/pages/Contact.jsx
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000); // Reset after 4 seconds
  };

  return (
          <div
          className="min-h-screen py-16 px-6 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/contact-bg.jpg')` }}
          >


      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you. Whether you have a question about bookings, destinations,
          or anything else — our team is ready to answer all your questions.
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-12">
          <div>
            <FaEnvelope className="text-blue-600 text-3xl mx-auto mb-2" />
            <p>Email</p>
            <a href="mailto:support@flightbookingss.com" className="text-blue-700 underline">
              support@flightbookingss.com
            </a>
          </div>
          <div>
            <FaPhone className="text-blue-600 text-3xl mx-auto mb-2" />
            <p>Phone</p>
            <a href="tel:+254700123456" className="text-blue-700 underline">
              +254 700 123 456
            </a>
          </div>
          <div>
            <FaMapMarkerAlt className="text-blue-600 text-3xl mx-auto mb-2" />
            <p>Location</p>
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        {/* Google Map */}
        <div className="mb-12 rounded-xl overflow-hidden shadow">
          <iframe
            title="FMS Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.214775359035!2d36.8064956!3d-1.2920654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10dff6d71c67%3A0xf6025a68e6d0abf2!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1687197397493!5m2!1sen!2ske"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            required
            className="md:col-span-2 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <FaPaperPlane /> Send Message
          </button>
        </form>

        {/* Feedback Message */}
        {submitted && (
          <div className="text-green-600 text-center mt-6 font-medium">
            ✅ Thanks for reaching out! We’ll get back to you shortly.
          </div>
        )}
      </div>
    </div>
  );
}
