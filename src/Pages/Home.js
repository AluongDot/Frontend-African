import React from 'react';
import { Container } from 'react-bootstrap';
import Courses from './Courses';

const Home = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #e6f0ff 0%, #c2e0ff 100%)',
      minHeight: '100vh',
      padding: '20px 0',
      animation: 'fadeIn 1s ease-in'
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      
      <Container className="py-4">
        <div className="text-center mb-5">
          <h1 
            className="display-4 fw-bold" 
            style={{ 
              color: '#0d6efd',
              animation: 'slideDown 0.8s ease-out'
            }}
          >
            African Learning Platform
          </h1>
          <p
            className="lead fs-4"
            style={{
              color: '#0d6efd',
              fontWeight: '500',
              letterSpacing: '0.5px',
              animation: 'fadeInUp 1s ease-out',
              animationDelay: '0.3s',
              animationFillMode: 'both'
            }}
          >
            Advance your skills with our expert-led courses.
          </p>
        </div>

        <style>
          {`
            @keyframes slideDown {
              from { 
                transform: translateY(-20px);
                opacity: 0;
              }
              to { 
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes fadeInUp {
              from { 
                transform: translateY(10px);
                opacity: 0;
              }
              to { 
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}
        </style>

        <Courses />
      </Container>
    </div>
  );
};

export default Home;