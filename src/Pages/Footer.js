import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const iconStyle = {
  width: 28,
  height: 28,
  verticalAlign: 'middle',
  transition: 'all 0.3s ease',
  opacity: 0.9,
  background: 'transparent',
  filter: 'brightness(0) invert(1)'
};

const Footer = () => (
  <footer
    style={{
      background: "linear-gradient(135deg, #181818 0%, #111111 100%)",
      color: "#f8f9fa",
      boxShadow: "0 0 40px 0 rgba(13,110,253,0.10)",
      fontSize: "1rem",
      padding: "2rem 0 1rem 0"
    }}
    className="mt-5"
  >
    <Container>
      <Row className="mb-4">
        <Col md={4} className="mb-4 mb-md-0 text-center text-md-start">
          <h5 className="mb-2" style={{ fontWeight: 700, color: "#fff" }}>
            <i className="fas fa-graduation-cap me-2"></i>
            LMS Platform
          </h5>
          <p style={{ color: "#b0b3b8" }}>
            Empowering Africa's future through accessible, high-quality digital education.
          </p>
        </Col>
        <Col md={2} xs={6} className="mb-4 mb-md-0">
          <h6 className="mb-3 text-uppercase" style={{ color: "#fff" }}>Quick Links</h6>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Home</Link></li>
            <li><Link to="/courses" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Courses</Link></li>
            <li><Link to="/about" className="text-decoration-none" style={{ color: "#b0b3b8" }}>About Us</Link></li>
            <li><Link to="/contact" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Contact</Link></li>
          </ul>
        </Col>
        <Col md={2} xs={6} className="mb-4 mb-md-0">
          <h6 className="mb-3 text-uppercase" style={{ color: "#fff" }}>Categories</h6>
          <ul className="list-unstyled">
            <li><Link to="/development" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Development</Link></li>
            <li><Link to="/security" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Security</Link></li>
            <li><Link to="/marketing" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Marketing</Link></li>
            <li><Link to="/data-science" className="text-decoration-none" style={{ color: "#b0b3b8" }}>Data Science</Link></li>
          </ul>
        </Col>
        <Col md={4} className="text-center text-md-start">
          <h6 className="mb-3 text-uppercase" style={{ color: "#fff" }}>Contact Us</h6>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a 
                href="mailto:info@africanlearning.org" 
                className="text-decoration-none d-inline-block"
                style={{ color: "#b0b3b8" }}
              >
                <i className="fas fa-envelope me-2"></i>
                info@africanlearning.org
              </a>
            </li>
            <li className="mb-2">
              <a 
                href="tel:+254700123456" 
                className="text-decoration-none d-inline-block"
                style={{ color: "#b0b3b8" }}
              >
                <i className="fas fa-phone me-2"></i>
                +254 700 123 456
              </a>
            </li>
            <li className="mb-3">
              <span className="d-inline-block" style={{ color: "#b0b3b8" }}>
                <i className="fas fa-map-marker-alt me-2"></i>
                Nairobi, Kenya
              </span>
            </li>
          </ul>
          <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Visit our Facebook"
              className="footer-social-link"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg"
                alt="Facebook"
                style={iconStyle}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              title="Visit our Twitter"
              className="footer-social-link"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twitter.svg"
                alt="Twitter"
                style={iconStyle}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="Visit our LinkedIn"
              className="footer-social-link"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
                alt="LinkedIn"
                style={iconStyle}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Visit our Instagram"
              className="footer-social-link"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg"
                alt="Instagram"
                style={iconStyle}
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="Visit our YouTube"
              className="footer-social-link"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg"
                alt="YouTube"
                style={iconStyle}
              />
            </a>
          </div>
        </Col>
      </Row>
      <hr className="bg-light my-3" />
      <Row>
        <Col md={6} className="text-center text-md-start mb-2 mb-md-0" style={{ color: "#b0b3b8", fontSize: "0.95em" }}>
          © {new Date().getFullYear()} LMS Platform. All rights reserved.
        </Col>
        <Col md={6} className="text-center text-md-end" style={{ color: "#b0b3b8", fontSize: "0.95em" }}>
          <Link to="/terms" className="text-decoration-none me-3" style={{ color: "#b0b3b8" }}>
            Terms
          </Link>
          <Link to="/privacy" className="text-decoration-none me-3" style={{ color: "#b0b3b8" }}>
            Privacy
          </Link>
          <Link to="/contact" className="text-decoration-none" style={{ color: "#b0b3b8" }}>
            Contact
          </Link>
        </Col>
      </Row>
    </Container>
    <style>
      {`
        .footer-social-link {
          display: inline-block;
          transition: transform 0.3s ease;
          border-radius: 50%;
          padding: 5px;
        }
        .footer-social-link:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.1);
        }
        .footer-social-link:hover img {
          opacity: 1;
          transform: scale(1.1);
        }
        a:hover {
          color: #e9ecef !important;
          transition: color 0.2s ease;
        }
      `}
    </style>
  </footer>
);

export default Footer;