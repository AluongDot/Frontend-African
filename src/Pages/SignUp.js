import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const API_BASE = "http://localhost:8081/api/kyc/register";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' // Default to student
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, and number';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.userType) newErrors.userType = 'Please select a user type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          isEnrolled: formData.userType !== 'student' // Auto-enroll non-students
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle different types of errors from the server
        if (data.errors) {
          // Handle field-specific errors from server
          const serverErrors = {};
          data.errors.forEach(err => {
            serverErrors[err.path] = err.msg;
          });
          setErrors(serverErrors);
        } else if (data.message) {
          setSubmitError(data.message);
        } else {
          setSubmitError('Registration failed. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // Redirect to login with success message
      navigate('/login', { 
        state: { 
          registrationSuccess: true,
          message: `Registration successful! Please login as ${formData.userType}`,
          // Pass the email to pre-fill the login form
          prefilledEmail: formData.email
        } 
      });
    } catch (err) {
      console.error('Registration error:', err);
      setSubmitError('Unable to connect to the server. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Create Your Account</h2>
          <p className="text-muted">Join thousands of learners worldwide</p>
        </div>
        
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
              placeholder="Enter your full name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Create a password (min 8 characters)"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Must contain uppercase, lowercase, and a number
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              placeholder="Confirm your password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="userType" className="mb-3">
            <Form.Label>I am signing up as</Form.Label>
            <Form.Select 
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              isInvalid={!!errors.userType}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.userType}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-100 py-2 fw-bold mt-3 mb-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Creating Account...
              </>
            ) : 'Get Started'}
          </Button>
        </Form>

        <div className="text-center mt-4 pt-3">
          <p className="mb-0">
            Already have an account?{' '}
            <Link to="/login" className="fw-bold text-decoration-none">
              Sign in here
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default SignUp;