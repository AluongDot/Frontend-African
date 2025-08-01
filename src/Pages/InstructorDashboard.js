import React from "react";

const style = `
/* ... (same CSS from previous snippet) ... */
`;

const InstructorDashboard = () => (
  <>
    <style>{style}</style>

    {/* Top Navigation */}
    <nav className="top-nav">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="brand-logo">
          <i className="fas fa-graduation-cap"></i>
          <span>African Learning Platform</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <i className="fas fa-bell fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">5</span>
          </div>
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
              <div className="user-avatar">SI</div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end mt-2">
              <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i> Profile</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i> Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt me-2"></i> Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    {/* User Info Bar */}
    <div className="user-bar">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="user-info">
          <div className="user-avatar">SI</div>
          <div>
            <h5 className="mb-0">Dr. Johnson Dot</h5>
            <p className="mb-0 text-muted">Senior Instructor</p>
          </div>
        </div>
        <button className="btn btn-outline-primary">
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>
    </div>

    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="nav flex-column nav-items">
          {[
            ["Dashboard", "fas fa-tachometer-alt"],
            ["Courses", "fas fa-book"],
            ["Students", "fas fa-users"],
            ["Assignments", "fas fa-tasks"],
            ["Quizzes", "fas fa-question-circle"],
            ["Analytics", "fas fa-chart-line"],
            ["Messages", "fas fa-comments"],
            ["Earnings", "fas fa-wallet"],
            ["Settings", "fas fa-cog"],
          ].map(([text, icon], idx) => (
            <li className="nav-item" key={idx}>
              <a href="#" className={`nav-link${idx === 0 ? " active" : ""}`}>
                <i className={icon}></i>
                <span className="nav-text">{text}</span>
                {text === "Messages" && <span className="badge bg-danger ms-auto">12</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-0">Instructor Dashboard</h3>
            <p className="text-muted mb-0">Welcome back, Dr. Johnson! Here's your teaching overview</p>
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-plus me-2"></i> Create Course
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          {[
            { icon: "fas fa-book", bg: "rgba(13,110,253,0.15)", color: "var(--primary)", number: 8, title: "Courses Taught" },
            { icon: "fas fa-users", bg: "rgba(25,135,84,0.15)", color: "var(--success)", number: 642, title: "Total Students" },
            { icon: "fas fa-star", bg: "rgba(255,193,7,0.15)", color: "var(--warning)", number: 4.9, title: "Average Rating" },
            { icon: "fas fa-wallet", bg: "rgba(111,66,193,0.15)", color: "var(--secondary)", number: "KSH 245 K", title: "Earnings" },
          ].map((s, i) => (
            <div className="col-md-6 col-lg-3 mb-4" key={i}>
              <div className="stats-card">
                <div className="stats-icon" style={{ background: s.bg, color: s.color }}>
                  <i className={s.icon}></i>
                </div>
                <div className="stats-number">{s.number}</div>
                <div className="stats-title">{s.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="row mb-4">
          <div className="col-12 mb-4"><h4 className="fw-bold">Your Courses</h4></div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="course-card">
              <div className="course-header">
                <h5 className="mb-0">FullStack Web Development</h5>
              </div>
              <div className="card-body">
                {/* Overview */}
                <div className="d-flex justify-content-between mb-3">
                  <span><span className="badge bg-primary">Active</span></span>
                  <span className="text-white bg-success px-2 py-1 rounded">4.8 ★</span>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Progress</span><span>78%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div className="progress-bar" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-users me-2 text-primary"></i><strong>Students:</strong> 245</li>
                  <li className="mb-2"><i className="fas fa-tasks me-2 text-primary"></i><strong>Assignments:</strong> 12</li>
                  <li><i className="fas fa-chart-line me-2 text-primary"></i><strong>Completion Rate:</strong> 85%</li>
                </ul>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-sm btn-outline-primary flex-grow-1">
                    <i className="fas fa-edit me-1"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-primary flex-grow-1">
                    <i className="fas fa-chart-bar me-1"></i> Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students & Activity */}
        <div className="row">
          <div className="col-lg-8">
            {/* Recent Students */}
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h5 className="mb-0">Recent Students</h5>
                <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Student</th><th>Course</th><th>Progress</th><th>Last Active</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="d-flex align-items-center">
                          <div className="student-avatar me-2">JD</div> John Doe
                        </td>
                        <td>FullStack Dev</td>
                        <td>
                          <div className="progress" style={{ height: "6px" }}>
                            <div className="progress-bar" style={{ width: "75%" }}></div>
                          </div>
                          <small>75%</small>
                        </td>
                        <td>Today</td>
                        <td><button className="btn btn-sm btn-outline-primary">Message</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h5 className="mb-0">Recent Activity</h5>
                <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
              </div>
              <div className="card-body">
                <div className="activity-item">
                  <div className="activity-icon"><i className="fas fa-user-plus"></i></div>
                  <div className="activity-content">
                    <div className="fw-medium">New student enrolled</div>
                    <div className="text-muted">John Doe enrolled in FullStack Web Development</div>
                    <div className="text-muted small mt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings & Messages */}
          <div className="col-lg-4">
            {/* Earnings */}
            <div className="card mb-4">
              <div className="card-header bg-white"><h5 className="mb-0">Earnings Overview</h5></div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">KSH 78,500</h3>
                  <p className="text-muted">Total earnings this month</p>
                  <div className="text-success"><i className="fas fa-arrow-up"></i> 24.5% from last month</div>
                </div>
                {[
                  ["FullStack Development", "KSH 42,300", "65%"],
                  ["Mobile App Dev", "KSH 28,700", "45%"],
                  ["Cybersecurity", "KSH 7,500", "15%"],
                ].map(([title, amount, pct], i) => (
                  <React.Fragment key={i}>
                    <div className="d-flex justify-content-between mb-2"><span>{title}</span><span>{amount}</span></div>
                    <div className="progress mb-3" style={{ height: "8px" }}>
                      <div className="progress-bar" style={{ width: pct }}></div>
                    </div>
                  </React.Fragment>
                ))}
                <div className="d-grid">
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-download me-2"></i> Download Report
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h5 className="mb-0">Recent Messages</h5>
                <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
              </div>
              <div className="card-body">
                <div className="d-flex gap-3 mb-3">
                  <div className="student-avatar">JD</div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0">John Doe</h6>
                    <p className="text-muted mb-0">Can you explain the assignment requirements?</p>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">
                    <i className="fas fa-comments me-2"></i> Go to Messages
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer mt-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-4"><h5 className="mb-3">African Learning Platform</h5><p>Empowering Africa's future through accessible, high-quality digital education. We're building Africa's premier learning platform designed for Africa’s unique opportunities.</p></div>
              <div className="col-lg-2 col-md-4 mb-4">
                <h6>Quick Links</h6>
                <div className="footer-links d-flex flex-column">
                  <a href="#">Instructor Hub</a><a href="#">Resources</a><a href="#">Support</a><a href="#">Community</a>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 mb-4">
                <h6>For Instructors</h6>
                <div className="footer-links d-flex flex-column">
                  <a href="#">Course Guidelines</a><a href="#">Pricing</a><a href="#">Marketing Tips</a><a href="#">Analytics</a>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <h6>Contact Support</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-envelope me-2"></i> instructors@africanlearning.org</li>
                  <li className="mb-2"><i className="fas fa-phone me-2"></i> +254 700 123 456</li>
                  <li><i className="fas fa-clock me-2"></i> Mon–Fri: 8 am–6 pm EAT</li>
                </ul>
                <div className="d-flex gap-2 mt-3">
                  <a href="#" className="btn btn-sm btn-light"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="btn btn-sm btn-light"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="btn btn-sm btn-light"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="btn btn-sm btn-light"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
            <hr className="mt-4 mb-3" />
            <div className="text-center"><p className="mb-0">&copy; 2023 African Learning Platform. Empowering Africa's digital future.</p></div>
          </div>
        </footer>
      </div>
    </div>
  </>
);

export default InstructorDashboard;
// Note: The above code is a complete React component for an instructor dashboard.