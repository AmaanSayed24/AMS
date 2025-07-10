import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import SubjectPage from './pages/SubjectPage';
import AttendancePage from './pages/AttendancePage';
import ReportPage from './pages/ReportPage';
import AllSubjectAttendancePage from './pages/AllSubjectAttendancePage';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">AMS</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/students">Students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/subjects">Subjects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendance">Attendance</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/report">Report</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/subject-attendance">All Attendance</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/students" element={<StudentPage />} />
          <Route path="/subjects" element={<SubjectPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/subject-attendance" element={<AllSubjectAttendancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;