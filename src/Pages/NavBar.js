import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

function NavBar() {
  useEffect(() => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
    
    return () => {
      document.body.style.paddingTop = '';
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <Container>
        <Link className="navbar-brand d-flex align-items-center" to="/endpoint">
          <div className="logo-container position-relative me-3">
            <img 
              src="/African lms.png" 
              alt="LMS Logo" 
              className="rounded-circle"
              style={{ 
                height: '60px', 
                width: '60px', 
                objectFit: 'cover',
                border: '3px solid #FFD700',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
              }}
            />
            <div className="logo-glow"></div>
          </div>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#basic-navbar-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Regular nav items with golden hover effect */}
            {['Home', 'AboutUs', 'Courses', 'Donate', 'Contact', 'Login'].map((item) => (
              <li className="nav-item" key={item}>
                <Link 
                  className="nav-link position-relative text-white mx-2"
                  to={`/${item.toLowerCase()}`}
                >
                  {item}
                  <span className="gold-underline"></span>
                </Link>
              </li>
            ))}
            
            {/* SignUp button with golden hover effect */}
            <li className="nav-item ms-lg-2">
              <Link 
                className="nav-link btn text-white fw-bold position-relative golden-button"
                to="/signup"
              >
                Sign Up
                <span className="golden-shine"></span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      
      {/* CSS for hover effects and logo */}
      <style jsx="true">{`
        /* Logo styling */
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .logo-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0) 70%);
          z-index: 1;
          pointer-events: none;
        }
        
        /* Golden hover effect for text links */
        .nav-link:not(.btn) {
          transition: color 0.3s ease;
          padding: 8px 0;
        }
        
        .nav-link:not(.btn):hover {
          color: #FFD700 !important;
        }
        
        /* Golden underline animation */
        .gold-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #FFD700;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .nav-link:not(.btn):hover .gold-underline {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        /* Sign Up button styling */
        .golden-button {
          background: linear-gradient(45deg, #d4af37, #f9e076);
          border: none;
          border-radius: 30px;
          padding: 8px 20px;
          transition: all 0.3s ease;
          z-index: 1;
          overflow: hidden;
        }
        
        .golden-button:hover {
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
          transform: translateY(-2px);
        }
        
        /* Golden shine effect for Sign Up button */
        .golden-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          opacity: 0;
          transform: translateX(-100%) rotate(45deg);
          transition: all 0.6s ease;
          z-index: -1;
        }
        
        .golden-button:hover .golden-shine {
          opacity: 0.3;
          transform: translateX(100%) rotate(45deg);
        }
      `}</style>
    </nav>
  );
}

export default NavBar;