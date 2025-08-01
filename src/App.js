import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Pages/NavBar';
import Footer from './Pages/Footer';
import RouteGuard from './Pages/RoutesGuard';

// Import all page components
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Courses from './Pages/Courses';
import Donate from './Pages/Donate';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminDashboard from './Pages/AdminDashboard';
import InstructorDashboard from './Pages/InstructorDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import Enrollment from './Pages/Enroll';
import NotFound from './Pages/NotFound';


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/enrollment" element={<Enrollment />} />
            
            {/* Protected Routes */}
            <Route element={<RouteGuard allowedRoles={['admin']} />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>
            
            <Route element={<RouteGuard allowedRoles={['instructor']} />}>
              <Route path="/instructor/*" element={<InstructorDashboard />} />
            </Route>
            
            <Route element={<RouteGuard allowedRoles={['student']} />}>
              <Route path="/student/*" element={<StudentDashboard />} />
            </Route>
            
            {/* Redirect to home after login */}
            <Route path="/redirect" element={<Navigate to="/" replace />} />
            
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;