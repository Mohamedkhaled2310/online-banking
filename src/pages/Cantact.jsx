import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API request)
    setTimeout(() => {
      setSuccess(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <section className="container my-5">
        <h2 className="text-center mb-4">Contact Us</h2>

        {/* Contact Form */}
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {success && (
                    <div className="alert alert-success mb-3">
                      Your message has been sent successfully!
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Google Map Section */}
      <section className="container my-5 text-center">
        <h3 className="text-center mb-4">Our Location</h3>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="Google Map"
            className="embed-responsive-item"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.423406370774!2d90.3563680153663!3d23.81030359454144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72fdb7c8c1f%3A0x1db59b159a7fcb27!2sDhaka%20City%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1677691118365!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Contact Details */}
      <section className="container my-5">
        <h3 className="text-center mb-4">Contact Details</h3>
        <div className="row">
          <div className="col-md-4 ext-center fw-bold">
            <h5>Address:</h5>
            <p>1234 Banking Street, City, Country</p>
          </div>
          <div className="col-md-4">
            <h5>Email:</h5>
            <p>support@onlinebank.com</p>
          </div>
          <div className="col-md-4">
            <h5>Phone:</h5>
            <p>+1 (234) 567-8900</p>
          </div>
        </div>
      </section>
    </div>
  );
}
