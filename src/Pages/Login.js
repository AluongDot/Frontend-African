import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Removed isStudentLogin state as it's not needed for the login form title

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Use environment variable with fallback
  // Ensure your .env file has REACT_APP_API_BASE set, e.g., REACT_APP_API_BASE="http://localhost:8081/api/kyc/login"
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8081/api/kyc/login";

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setCredentials(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = credentials;

    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }

    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include' // This is important for sending/receiving cookies, if your backend uses them for sessions
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Login failed with status ${response.status}`
        );
      }

      const data = await response.json();

      const userData = {
        email: credentials.email,
        name: data.name || 'User',
        token: data.token, // Assuming the backend returns a token
        role: data.role?.toLowerCase() || 'student', // Default to 'student' if role is not provided
        isEnrolled: data.isEnrolled || false,
        ...(data.userId && { userId: data.userId }) // Conditionally add userId if present
      };

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', credentials.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Redirect based on the user's role
      if (userData.role === 'student') {
        navigate('/student/dashboard', { 
          state: { user: userData },
          replace: true // Replaces the current entry in the history stack
        });
      } else {
        let redirectPath = '/'; // Default redirect
        switch(userData.role) {
          case 'admin':
            redirectPath = '/admin/dashboard';
            break;
          case 'instructor':
            redirectPath = '/instructor/dashboard';
            break;
          default:
            // For any other unexpected role, redirect to home or a generic dashboard
            redirectPath = '/dashboard'; 
        }
        navigate(redirectPath, { 
          state: { user: userData },
          replace: true 
        });
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.message.includes('Failed to fetch') 
          ? 'Unable to connect to the server. Please check your network connection.'
          : err.message || 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary">
          login
        </h2>
        
        {state?.message && <Alert variant="info">{state.message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Enter your password"
              />
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-between mb-4">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="rememberMeCheckbox"
            />
            <Button 
              variant="link" 
              onClick={() => navigate('/forgot-password')}
              className="p-0"
            >
              Forgot password?
            </Button>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-100 mb-3" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner 
                  as="span" 
                  animation="border" 
                  size="sm" 
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Signing in...
              </>
            ) : 'Sign In'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="mb-0">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              onClick={() => navigate('/register')}
              className="p-0"
            >
              Create account
            </Button>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Login;