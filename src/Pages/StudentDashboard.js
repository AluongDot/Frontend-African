import React from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = `
/* [Your CSS styles here] */
`;

const user = {
  name: "John Doe",
  initials: "JD",
  role: "Computer Science Student"
};

const availableCourses = [
  {
    id: "1",
    title: "FullStack Development",
    instructor: "Jane Smith",
    price: 12000,
    duration: 6
  },
  {
    id: "2",
    title: "Cybersecurity Essentials",
    instructor: "Samuel K.",
    price: 8000,
    duration: 6
  },
  {
    id: "3",
    title: "Data Analytics",
    instructor: "Mary Johnson",
    price: 11000,
    duration: 6
  }
];

const enrolledCourses = [
  {
    id: "1",
    title: "FullStack Development",
    progress: 60,
    instructor: "Jane Smith"
  },
  {
    id: "2",
    title: "Cybersecurity Essentials",
    progress: 35,
    instructor: "Samuel K."
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleEnrollClick = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  return (
    <div className="student-dashboard-root">
      <style>{styles}</style>

      {/* [Previous nav, user bar, and sidebar code remains the same] */}

      <div className="main-content">
        <div className="container py-4">
          {/* [Previous content remains the same until the footer] */}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="mb-3">African Learning Platform</h5>
              <p>Empowering Africa's future through accessible, high-quality digital education.</p>
              <div className="social-icons mt-3">
                <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white me-3"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h6 className="mb-3">Quick Links</h6>
              <div className="footer-links d-flex flex-column">
                <Link to="/student" className="text-white mb-2">Dashboard</Link>
                <Link to="/" className="text-white mb-2">Home</Link>
                <Link to="/courses" className="text-white mb-2">Courses</Link>
                <Link to="/about" className="text-white mb-2">About Us</Link>
                <Link to="/contact" className="text-white">Contact</Link>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h6 className="mb-3">Resources</h6>
              <div className="footer-links d-flex flex-column">
                <Link to="/blog" className="text-white mb-2">Blog</Link>
                <Link to="/faq" className="text-white mb-2">FAQ</Link>
                <Link to="/help-center" className="text-white mb-2">Help Center</Link>
                <Link to="/terms" className="text-white mb-2">Terms</Link>
                <Link to="/privacy" className="text-white">Privacy Policy</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <h6 className="mb-3">Contact Us</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-map-marker-alt me-2"></i> 
                  Nairobi, Kenya
                </li>
                <li className="mb-2">
                  <i className="fas fa-envelope me-2"></i> 
                  info@africanlearning.org
                </li>
                <li className="mb-2">
                  <i className="fas fa-phone me-2"></i> 
                  +254 700 123 456
                </li>
                <li>
                  <i className="fas fa-clock me-2"></i> 
                  Mon-Fri: 9:00 AM - 5:00 PM
                </li>
              </ul>
            </div>
          </div>
          <hr className="mt-4 mb-3 bg-light" />
          <div className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} African Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;