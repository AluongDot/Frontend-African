import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8081';

const courses = [
  {
    id: "1",
    title: 'Full Stack Development',
    price: 12000,
    duration: 6,
    image: '/thumbnail.JPG',
  },
  {
    id: "2",
    title: 'Digital Marketing & E-Commerce',
    price: 10000,
    duration: 6,
    image: '/thumbnail.JPG',
  },
  {
    id: "3",
    title: 'Cyber Security',
    price: 8000,
    duration: 6,
    image: '/thumbnail.JPG',
  },
  {
    id: "4",
    title: 'Data Analytics',
    price: 11000,
    duration: 6,
    image: '/thumbnail.JPG',
  },
  {
    id: "5",
    title: 'Cloud Computing',
    price: 15000,
    duration: 6,
    image: '/thumbnail.JPG',
  },
  {
    id: "6",
    title: 'AI & Machine Learning',
    price: 18000,
    duration: 6,
    image: '/thumbnail.JPG',
  },
];

const Enroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);

  const [method, setMethod] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const isValid = () => {
    if (!name || (method !== 'MPesa' && !email)) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return false;
    }
    if (method === 'MPesa' && !phone) {
      setMessage({ text: 'Please provide a valid phone number', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) return;

    setLoading(true);
    setMessage({ text: 'Processing payment...', type: 'info' });

    try {
      let paymentResponse;
      
      if (method === 'MPesa') {
        paymentResponse = await axios.post(`${API_BASE}http:localhost:8081/api/mpesa/payment`, {
          phone,
          amount: course.price,
          courseId: course.id
        });
        setMessage({ text: paymentResponse.data.CustomerMessage || 'Payment request sent', type: 'success' });
        return;
      }
      
      if (method === 'Stripe') {
        paymentResponse = await axios.post(`${API_BASE}/api/stripe/create-checkout-session`, {
          name,
          email,
          amount: course.price,
          courseId: course.id,
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-canceled`
        });
        window.location.href = paymentResponse.data.url;
        return;
      }
      
      if (method === 'PayPal') {
        setMessage({ text: 'Use the PayPal button below', type: 'info' });
        return;
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Payment processing failed. Please try again.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Course not found</div>
        <button className="btn btn-primary" onClick={() => navigate('/courses')}>
          Browse Available Courses
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-5">
        {/* Course Info */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <img
              src={course.image}
              alt={course.title}
              className="card-img-top"
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h4 className="card-title">{course.title}</h4>
              <p><strong>Price:</strong> KES {course.price.toLocaleString()}</p>
              <p><strong>Duration:</strong> {course.duration} month{course.duration > 1 ? 's' : ''}</p>
              <p><strong>Mode:</strong> Online / Self-paced</p>
            </div>
          </div>
        </div>

        {/* Enrollment & Payment */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="mb-3">Enroll & Pay</h3>

            {message.text && (
              <div className={`alert alert-${message.type === 'error' ? 'danger' : message.type === 'success' ? 'success' : 'info'}`}>
                {message.text}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Select Payment Method</label>
              <select 
                className="form-select" 
                value={method} 
                onChange={(e) => {
                  setMethod(e.target.value);
                  setMessage({ text: '', type: '' });
                }}
                disabled={loading}
              >
                <option value="">-- Choose Method --</option>
                <option value="MPesa">MPesa</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            {method && (
              <>
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    className="form-control"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label>Amount (KES)</label>
                  <input
                    className="form-control"
                    value={course.price.toLocaleString()}
                    readOnly
                  />
                </div>
                {method !== 'MPesa' && (
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}
                {method === 'MPesa' && (
                  <div className="mb-3">
                    <label>Phone number (format: 2547XXXXXXXX)</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="2547XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}
              </>
            )}

            {/* Action Buttons */}
            {method && method !== 'PayPal' && (
              <div className="d-grid mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-success btn-lg"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Processing...
                    </>
                  ) : (
                    `Pay with ${method}`
                  )}
                </button>
              </div>
            )}

            {/* PayPal Payment */}
            {method === 'PayPal' && (
              <div className="mt-4 border rounded p-3 bg-light">
                <PayPalScriptProvider 
                  options={{ 
                    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID || 'ATqu5zLoSLN-o_lo7mPBo5Up8O0GqkPqAZfRWbdLJy8fLm4DGqKhGutCkAoPxl3d4a22qHe8lhGnpUCH',
                    currency: 'USD'
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'horizontal', color: 'blue', shape: 'pill' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ 
                          amount: { 
                            value: (course.price / 100).toFixed(2), // Convert to USD
                            currency_code: 'USD'
                          } 
                        }],
                        application_context: {
                          shipping_preference: 'NO_SHIPPING'
                        }
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        // Send payment confirmation to your backend
                        axios.post(`${API_BASE}'http:localhost:8081/api/enroll`, {
                          paymentMethod: 'PayPal',
                          paymentId: details.id,
                          courseId: course.id,
                          studentName: name,
                          studentEmail: email,
                          amount: course.price
                        }).then(() => {
                          navigate('/payment-success', { 
                            state: { 
                              course: course.title,
                              amount: course.price,
                              paymentMethod: 'PayPal'
                            } 
                          });
                        });
                      });
                    }}
                    onError={(err) => {
                      setMessage({ text: 'PayPal payment failed. Please try another method.', type: 'error' });
                      console.error('PayPal error:', err);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            <p className="text-muted mt-3 text-center small">
              Secure payment processing. All transactions are encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;