import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Spinner } from 'react-bootstrap';

// Your static course data
const fallbackCourses = [
  {
    id: 1,
    title: "FullStack Development",
    description: "Master both frontend and backend development with real-world projects.",
    detailedDescription: "This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. Perfect for aspiring developers.",
    price: "Ksh 5000",
    category: "development",
    level: "Beginner to Advanced",
    duration: 6,
    features: [
      "Responsive web design",
      "RESTful APIs",
      "Database integration",
      "Real-world projects"
    ],
    image: "full-stack.png"
  },
  {
    id: 2,
    title: "Cyber Security",
    description: "Learn to protect systems and networks from cyber threats.",
    detailedDescription: "Covers ethical hacking, risk management, vulnerability scanning, and security protocols. Great for IT and security professionals.",
    price: "Ksh 4500",
    category: "security",
    level: "Intermediate",
    duration: 6,
    features: [
      "Penetration testing",
      "Network security",
      "Threat detection",
      "Incident response"
    ],
    image: "Cyber-sec.png"
  },
  {
    id: 3,
    title: "Digital Marketing & E-commerce",
    description: "Grow businesses with digital campaigns and online stores.",
    detailedDescription: "Learn SEO, social media, Google Ads, and building online stores using Shopify and WooCommerce.",
    price: "Ksh 4000",
    category: "marketing",
    level: "Beginner",
    duration: 6,
    features: [
      "Social media marketing",
      "Email campaigns",
      "SEO fundamentals",
      "E-commerce platforms"
    ],
    image: "dig-me.png"
  },
  {
    id: 4,
    title: "Data Analytics Fundamentals",
    description: "Unlock insights from data to drive business decisions.",
    detailedDescription: "Master data collection, analysis, and visualization using Excel, Google Analytics, and Power BI.",
    price: "Ksh 5000",
    category: "data",
    level: "Beginner",
    duration: 8,
    features: [
      "Google Analytics setup",
      "Excel data analysis",
      "Power BI dashboards",
      "Data storytelling",
      "Business metrics",
      "Reporting techniques"
    ],
    image: "data-an.png"
  },
  {
    id: 5,
    title: "Cloud Computing",
    description: "Learn cloud fundamentals, deployment, and scalability.",
    detailedDescription: "Understand cloud infrastructure with AWS, Azure, and GCP. Ideal for developers and system admins.",
    price: "Ksh 5500",
    category: "cloud",
    level: "Intermediate",
    duration: 6,
    features: [
      "AWS & Azure basics",
      "Deployment strategies",
      "Cloud architecture",
      "Scalable solutions"
    ],
    image: "learnC.png"
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    description: "Build intelligent systems with Python, TensorFlow, and scikit-learn.",
    detailedDescription: "This course covers supervised and unsupervised learning, data processing, and real-life ML applications.",
    price: "Ksh 6000",
    category: "ai_ml",
    level: "Advanced",
    duration: 6,
    features: [
      "Python for AI",
      "Data preprocessing",
      "Neural networks",
      "Model deployment"
    ],
    image: "AIM.png"
  }
];

const EnrollmentForm = ({ show, onHide, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ fullName: '', contact: '', email: '' });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contact || !formData.email) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Enrollment Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Number *</Form.Label>
            <Form.Control
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Continue'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const PaymentMethod = ({ show, onHide, onSelect, amount, loading, studentInfo, selectedCourse }) => {
  const [method, setMethod] = useState('');
  const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState('');
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method) {
      alert('Please select a payment method');
      return;
    }

    onSelect({ method }); // This triggers the parent's payment loading state

    if (method === 'mpesa') {
      if (!mpesaPhoneNumber) {
        alert('Please enter your M-Pesa phone number');
        return;
      }
      setPaymentInitiated(true);
      try {
        const response = await fetch('http://localhost:8081/api/mpesa/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: mpesaPhoneNumber,
            amount: parseInt(amount), // Ensure amount is an integer
            courseTitle: selectedCourse.title, // Pass course details
            studentFullName: studentInfo.fullName,
            studentEmail: studentInfo.email,
            // You might want to include more details like transaction ID from the backend response
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'M-Pesa payment initiation failed');
        }

        const data = await response.json();
        alert(data.message || 'M-Pesa payment initiated. Please check your phone for the M-Pesa prompt.');
        // Optionally, you can close the modal or navigate to a success page
        onHide(); // Hide the payment modal after successful initiation
      } catch (error) {
        console.error('Error initiating M-Pesa payment:', error);
        alert(`M-Pesa payment failed: ${error.message}`);
      } finally {
        setPaymentInitiated(false);
      }
    } else {
      // For other payment methods, simply hide the modal and let the parent handle the "enrollment"
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select value={method} onChange={(e) => setMethod(e.target.value)} required>
              <option value="">-- Select --</option>
              <option value="mpesa">M-Pesa</option>
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
            </Form.Select>
          </Form.Group>

          {method === 'mpesa' && (
            <Form.Group className="mb-3">
              <Form.Label>M-Pesa Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                placeholder="e.g., 254712345678"
                value={mpesaPhoneNumber}
                onChange={(e) => setMpesaPhoneNumber(e.target.value)}
                required={method === 'mpesa'}
              />
            </Form.Group>
          )}

          <div className="mt-3 alert alert-info">Amount to pay: <strong>Ksh {amount}</strong></div>
          <Button type="submit" className="w-100 mt-3" disabled={loading || paymentInitiated}>
            {(loading || paymentInitiated) ? <Spinner size="sm" animation="border" /> : 'Complete Payment'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const CourseDetailsModal = ({ show, onHide, course }) => {
  if (!course) return null;
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{course.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <div style={{
              height: '250px',
              background: `url(${course.image || '/default-course.jpg'}) center/cover no-repeat`
            }} className="rounded" />
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <Badge bg="primary">{course.category}</Badge>{' '}
              <Badge bg="info">{course.level}</Badge>{' '}
              <Badge bg="secondary">{course.duration} months</Badge>
            </div>
            <h5 className="text-primary">{course.price}</h5>
            <p>{course.detailedDescription}</p>
            <ul>
              {course.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState(() => {
    try {
      const stored = localStorage.getItem('enrollments');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse enrollments from localStorage", e);
      return [];
    }
  });
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/courses');
        if (!res.ok) throw new Error('API Failed');
        const data = await res.json();
        setCourses(data.length ? data : fallbackCourses);
      } catch (err) {
        setCourses(fallbackCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleEnroll = (course) => {
    const user = localStorage.getItem('user');
    if (!user) return navigate('/login');
    setSelectedCourse(course);
    setShowEnrollment(true);
  };

  const handleEnrollmentSubmit = (info) => {
    setStudentInfo(info);
    setShowEnrollment(false);
    setShowPayment(true);
  };

  const handlePayment = (data) => {
    setPaymentLoading(true);
    // This part will now only be for the frontend's "successful enrollment" tracking
    // For M-Pesa, the actual payment initiation happens in PaymentMethod's handleSubmit
    // and the "enrollment" confirmation might depend on a webhook from your M-Pesa API.
    // For simplicity, we'll still mark as enrolled after the payment modal closes
    // assuming the M-Pesa prompt was successfully sent.
    setTimeout(() => {
      const updated = [...enrolledIds, selectedCourse.id];
      setEnrolledIds(updated);
      localStorage.setItem('enrollments', JSON.stringify(updated));
      alert(`You are now enrolled in ${selectedCourse.title}`);
      setShowPayment(false); // Hide the payment modal
      setPaymentLoading(false);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Explore Our Courses</h2>
        <p className="text-muted">Advance your career with industry-relevant programs</p>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {['all', 'development', 'security', 'marketing', 'data', 'cloud', 'ai_ml'].map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCourses.map(course => (
            <Col key={course.id}>
              <Card className="h-100">
                <div style={{
                  height: '200px',
                  background: `url(${course.image}) center/cover`
                }} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <span><Badge bg="secondary">{course.duration} months</Badge></span>
                    <span className="text-primary fw-bold">{course.price}</span>
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex">
                  <Button variant="outline-primary" onClick={() => { setSelectedCourse(course); setShowDetails(true); }}>
                    Learn More
                  </Button>
                  <Button
                    className="ms-auto"
                    onClick={() => handleEnroll(course)}
                    disabled={enrolledIds.includes(course.id)}
                  >
                    {enrolledIds.includes(course.id) ? 'Enrolled' : 'Enroll Now'}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <EnrollmentForm
        show={showEnrollment}
        onHide={() => setShowEnrollment(false)}
        onSubmit={handleEnrollmentSubmit}
        loading={false}
      />

      {/* Pass studentInfo and selectedCourse to PaymentMethod */}
      <PaymentMethod
        show={showPayment}
        onHide={() => setShowPayment(false)}
        onSelect={handlePayment}
        amount={selectedCourse ? selectedCourse.price.replace(/[^\d]/g, '') : ''}
        loading={paymentLoading}
        studentInfo={studentInfo}
        selectedCourse={selectedCourse} // Pass selectedCourse to PaymentMethod
      />

      <CourseDetailsModal
        show={showDetails}
        onHide={() => setShowDetails(false)}
        course={selectedCourse}
      />
    </Container>
  );
};
export default Courses;