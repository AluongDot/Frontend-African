import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const contactInfo = {
  address: "321 Education Street",
  city: "Nairobi, Kenya",
  emails: ["info@lms.com", "support@lms.com"],
  phones: ["+254 700 000000", "+254 711 000000"]
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    showAlert: false,
    variant: 'success',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });
    setTimeout(() => {
      setStatus({
        loading: false,
        showAlert: true,
        variant: 'success',
        message: "Thank you for your message! We'll get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e6f0ff 0%, #c2e0ff 100%)',
      minHeight: '100vh',
      padding: '60px 0'
    }}>
      <Container className="py-4">
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h1 className="display-5 fw-bold mb-3" style={{ color: '#0d6efd' }}>Contact Us</h1>
            <p className="lead text-muted fs-5">
              Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10}>
            {status.showAlert && (
              <Alert
                variant={status.variant}
                onClose={() => setStatus({ ...status, showAlert: false })}
                dismissible
                className="mt-3 rounded-3"
              >
                {status.message}
              </Alert>
            )}

            <Row className="g-4">
              <Col md={7}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden h-100">
                  <div style={{
                    background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                    height: '8px',
                    width: '100%'
                  }}></div>
                  <Card.Body className="p-4 p-md-5">
                    <h3 className="mb-4 fw-bold" style={{ color: '#0d6efd' }}>Send Us a Message</h3>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6} className="mb-4">
                          <Form.Group>
                            <Form.Label className="fw-medium">Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your name"
                              className="rounded-3 py-2 px-3 border-0"
                              style={{ backgroundColor: '#f8f9fa' }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-4">
                          <Form.Group>
                            <Form.Label className="fw-medium">Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="aluongmadiir@gmail.com"
                              className="rounded-3 py-2 px-3 border-0"
                              style={{ backgroundColor: '#f8f9fa' }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium">Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                          className="rounded-3 py-2 px-3 border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium">Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Your message here..."
                          style={{ resize: 'none', backgroundColor: '#f8f9fa' }}
                          className="rounded-3 py-2 px-3 border-0"
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={status.loading}
                          className="py-3 rounded-3 fw-bold border-0"
                          style={{
                            background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                            fontSize: '1.1rem'
                          }}
                        >
                          {status.loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={5}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden mb-4 h-100">
                  <div style={{
                    background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                    height: '8px',
                    width: '100%'
                  }}></div>
                  <Card.Body className="p-4">
                    <h3 className="mb-4 fw-bold" style={{ color: '#0d6efd' }}>Contact Information</h3>
                    <div className="d-flex mb-4">
                      <div className="me-3" style={{ color: '#0d6efd' }}>
                        <i className="fas fa-map-marker-alt fa-lg"></i>
                      </div>
                      <div>
                        <h5 className="h6 fw-medium mb-1">Our Location</h5>
                        <p className="mb-0 text-muted">
                          {contactInfo.address},<br />
                          {contactInfo.city}
                        </p>
                        {/* Google Maps Embed */}
                        <div className="mt-2 rounded-3 overflow-hidden" style={{ border: '1px solid #e3e3e3' }}>
                          <iframe
                            title="Google Map"
                            src="https://www.google.com/maps?q=321+Education+Street,+Nairobi,+Kenya&output=embed"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mb-4">
                      <div className="me-3" style={{ color: '#0d6efd' }}>
                        <i className="fas fa-envelope fa-lg"></i>
                      </div>
                      <div>
                        <h5 className="h6 fw-medium mb-1">Email Us</h5>
                        <p className="mb-0 text-muted">
                          {contactInfo.emails.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="me-3" style={{ color: '#0d6efd' }}>
                        <i className="fas fa-phone fa-lg"></i>
                      </div>
                      <div>
                        <h5 className="h6 fw-medium mb-1">Call Us</h5>
                        <p className="mb-0 text-muted">
                          {contactInfo.phones.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;