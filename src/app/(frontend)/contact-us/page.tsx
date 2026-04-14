import React from 'react'

export default function ContactUsPage() {
  return (
    <div className="contact-us">
      <div className="content">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you. Please reach out to us using the
          information below or fill out the contact form.
        </p>

        <div className="contact-info">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <strong>Email:</strong> contact@example.com
            </li>
            <li>
              <strong>Phone:</strong> +1 (555) 123-4567
            </li>
            <li>
              <strong>Address:</strong> 123 Main Street, City, State 12345
            </li>
          </ul>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Your message"></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
