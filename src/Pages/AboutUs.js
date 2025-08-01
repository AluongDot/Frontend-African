import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.96)), url(${process.env.PUBLIC_URL + "/about-bg.jpg"}) center/cover no-repeat`
      }}
    >
      <Container className="py-5">
        {/* Hero Header Section */}
        <Row className="mb-5 align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="d-flex flex-column h-100 justify-content-center">
              <h1 className="display-4 mb-3" style={{ fontWeight: 500, color: "#222" }}>
                African Learning Management System
              </h1>
              <p className="lead fs-4 text-dark" style={{ fontWeight: 400 }}>
                African Learning Platform: Igniting Potential, Transforming Futures.<br />
                Empowering Africa's Digital Renaissance Through Tailored Education.
              </p>
              <p className="fs-5 text-dark" style={{ fontWeight: 400 }}>
                We're building Africa's premier learning platform designed specifically for the continent's unique needs and opportunities.
              </p>
            </div>
          </Col>
          <Col lg={6} className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <img 
                src={process.env.PUBLIC_URL + "/alms.png"} 
                alt="African student learning online" 
                className="img-fluid rounded-3 shadow"
                style={{ 
                  maxHeight: '400px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Mission & Vision Section */}
        <Row className="mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #0d47a1 0%, #42a5f5 100%)",
                color: "#fff"
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-white text-primary rounded-circle p-3 me-3">
                    <i className="fas fa-bullseye fa-2x"></i>
                  </div>
                  <h2 className="mb-0 fw-bold" style={{ color: "#fff" }}>
                    Our Mission
                  </h2>
                </div>
                <Card.Text className="fs-5 fw-bold">
                  To democratize access to quality education across Africa by providing 
                  affordable, relevant, and technology-driven learning solutions that 
                  empower individuals and transform communities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
                color: "#fff"
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-white text-info rounded-circle p-3 me-3">
                    <i className="fas fa-eye fa-2x"></i>
                  </div>
                  <h2 className="mb-0 fw-bold" style={{ color: "#fff" }}>
                    Our Vision
                  </h2>
                </div>
                <Card.Text className="fs-5 fw-bold">
                  To become Africa's leading learning platform that bridges the digital 
                  divide and skills gap, enabling 10 million Africans to achieve their 
                  educational and professional goals by 2030.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Core Values Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#0d6efd' }}>Our Core Values</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    <div className="bg-primary text-white rounded-circle p-3 mb-3 mx-auto" style={{ width: '70px', height: '70px' }}>
                      <i className="fas fa-universal-access fa-2x"></i>
                    </div>
                    <Card.Title className="fw-bold fs-4">Inclusivity</Card.Title>
                    <Card.Text>We welcome all learners and educators.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    <div className="bg-primary text-white rounded-circle p-3 mb-3 mx-auto" style={{ width: '70px', height: '70px' }}>
                      <i className="fas fa-medal fa-2x"></i>
                    </div>
                    <Card.Title className="fw-bold fs-4">Excellence</Card.Title>
                    <Card.Text>We strive for the highest standards.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    <div className="bg-primary text-white rounded-circle p-3 mb-3 mx-auto" style={{ width: '70px', height: '70px' }}>
                      <i className="fas fa-lightbulb fa-2x"></i>
                    </div>
                    <Card.Title className="fw-bold fs-4">Innovation</Card.Title>
                    <Card.Text>We embrace new ideas and technologies.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Leadership Team Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#0d6efd' }}>Our Leadership Team</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
              <Col>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/Admin.png"}
                      alt="Jane Doe"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-5">Jane Doe</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary fw-medium">CEO & Founder</Card.Subtitle>
                    <Card.Text className="text-muted">Visionary leader with a passion for African education. Former Director at UNESCO.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/CTO.png"}
                      alt="Kwame Nkrumah"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-5">Kwame Nkrumah</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary fw-medium">Chief Technology Officer</Card.Subtitle>
                    <Card.Text className="text-muted">Tech innovator with 15+ years building scalable learning platforms. AWS Certified.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/CAO.png"}
                      alt="Amina Mohammed"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-5">Amina Mohammed</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary fw-medium">Chief Academic Officer</Card.Subtitle>
                    <Card.Text className="text-muted">Education specialist with PhD in Curriculum Development. Former Dean at University of Lagos.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/OD.png"}
                      alt="Thabo Mbeki"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-5">Thabo Mbeki</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary fw-medium">Operations Director</Card.Subtitle>
                    <Card.Text className="text-muted">Pan-African strategist specializing in educational access across 20+ countries.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Featured Instructors Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#0d6efd' }}>Featured Course Instructors</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/full-stack.png"}
                      alt="Dr. Adebayo Johnson"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold fs-5 mb-1">Dr. Adebayo Johnson</Card.Title>
                    <Card.Subtitle className="mb-3 text-success fw-medium">Full Stack Development</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">
                      Former Lead Developer at Andela. Specializes in MERN stack with 10+ years experience building scalable web applications.
                    </Card.Text>
                    <div className="mt-auto">
                      <h6 className="text-primary fw-bold">Courses:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">Modern Web Development</li>
                        <li className="mb-1">React & Node.js Mastery</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/dig-me.png"}
                      alt="Ngozi Eze"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold fs-5 mb-1">Ngozi Eze</Card.Title>
                    <Card.Subtitle className="mb-3 text-success fw-medium">Digital Marketing</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">
                      Founder of Digital Africa. Helped 500+ businesses grow online. Google Ads and Facebook Blueprint certified.
                    </Card.Text>
                    <div className="mt-auto">
                      <h6 className="text-primary fw-bold">Courses:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">Social Media Marketing</li>
                        <li className="mb-1">E-commerce Strategies</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/cyber-sec.png"}
                      alt="Kwame Asante"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold fs-5 mb-1">Kwame Asante</Card.Title>
                    <Card.Subtitle className="mb-3 text-success fw-medium">Cybersecurity</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">
                      Chief Security Officer at Pan-African Bank. Certified Ethical Hacker with 15+ years in information security.
                    </Card.Text>
                    <div className="mt-auto">
                      <h6 className="text-primary fw-bold">Courses:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">Ethical Hacking</li>
                        <li className="mb-1">Network Defense</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/data-an.png"}
                      alt="Dr. Fatima Bello"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold fs-5 mb-1">Dr. Fatima Bello</Card.Title>
                    <Card.Subtitle className="mb-3 text-success fw-medium">Data Analytics</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">
                      Data Science Lead at MTN. Expert in Python, SQL, and Power BI. PhD in Data Science from University of Cape Town.
                    </Card.Text>
                    <div className="mt-auto">
                      <h6 className="text-primary fw-bold">Courses:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">Data Visualization</li>
                        <li className="mb-1">Business Intelligence</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/cloudinstructor.png"}
                      alt="Tunde Okafor"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold fs-5 mb-1">Tunde Okafor</Card.Title>
                    <Card.Subtitle className="mb-3 text-success fw-medium">Cloud Computing</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">
                      AWS Solutions Architect. Migrated 50+ African businesses to cloud infrastructure. 5x AWS certified.
                    </Card.Text>
                    <div className="mt-auto">
                      <h6 className="text-primary fw-bold">Courses:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">AWS Fundamentals</li>
                        <li className="mb-1">Cloud Architecture</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={process.env.PUBLIC_URL + "/aim-instructor.png"}
                      alt="Prof. Wale Adekunle"
                      className="rounded-circle mx-auto mt-4 border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold fs-5 mb-1">Prof. Wale Adekunle</Card.Title>
                    <Card.Subtitle className="mb-3 text-success fw-medium">AI & Machine Learning</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">
                      Director at African AI Institute. Specializes in NLP for African languages. Former researcher at DeepMind.
                    </Card.Text>
                    <div className="mt-auto">
                      <h6 className="text-primary fw-bold">Courses:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">Machine Learning</li>
                        <li className="mb-1">Deep Learning</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Technical Implementation */}
        <Row className="mb-5">
          <Col md={10} className="mx-auto">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary text-white py-3">
                <h2 className="mb-0 text-center">Technical Excellence</h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center">
                        <i className="fas fa-server text-primary me-3 fa-lg"></i>
                        <span>AWS-powered cloud infrastructure with servers in Lagos, Nairobi, and Johannesburg</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i className="fas fa-shield-alt text-primary me-3 fa-lg"></i>
                        <span>Bank-level security for all transactions and data</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i className="fas fa-mobile-alt text-primary me-3 fa-lg"></i>
                        <span>Progressive Web App for offline learning capability</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center">
                        <i className="fas fa-sync-alt text-primary me-3 fa-lg"></i>
                        <span>Real-time progress tracking and analytics</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i className="fas fa-wifi text-primary me-3 fa-lg"></i>
                        <span>Low-bandwidth optimized content delivery</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i className="fas fa-plug text-primary me-3 fa-lg"></i>
                        <span>Integration with popular payment gateways across Africa</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="mt-5">
          <Col className="text-center">
            <div className="p-4 bg-light rounded-3 shadow-sm">
              <h2 className="mb-3 fw-bold">Ready to Begin Your Learning Journey?</h2>
              <p className="fs-5 mb-4">Join over 50,000 learners transforming their careers</p>
              <Link 
                to="/courses" 
                className="btn btn-primary me-3 px-4 py-2 fw-bold"
                style={{ textDecoration: 'none' }}
              >
                Browse Courses
              </Link>
              <Link 
                to="/register" 
                className="btn btn-outline-primary px-4 py-2 fw-bold"
                style={{ textDecoration: 'none' }}
              >
                Create Account
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;