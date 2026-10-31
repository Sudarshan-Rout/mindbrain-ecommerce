import "./Contact.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Send Email Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_s425uh4",
        "template_trzei2z",
        templateParams,
        "XDS4vAr4OLnO0zm4O"
      );

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">

      <h1>Contact Us</h1>

      <p>
        We'd love to hear from you. Feel free to contact us anytime.
      </p>

      <div className="contact-box">

        {/* Contact Information */}

        <div className="contact-info">

          <h2>
            <u>Our Information</u>
          </h2>

          <p>
            <strong>Email:</strong> sipurout870@gmail.com
          </p>

          <p>
            <strong>Phone:</strong> +91 7846807297
          </p>

          <p>
            <strong>Address:</strong> Paradeep, Odisha, India
          </p>

        </div>

        {/* Contact Form */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Enter Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;