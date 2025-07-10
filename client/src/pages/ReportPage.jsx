import React, { useEffect, useState } from 'react';
import { getStudents, getSubjects, fetchReport } from '../api';

function ReportPage() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({ studentId: '', subjectId: '', date: '' });
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [studentRes, subjectRes] = await Promise.all([getStudents(), getSubjects()]);
    setStudents(studentRes.data);
    setSubjects(subjectRes.data);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchReport(filters);
    setReport(res.data);
  };

  return (
    <div>
      <h4>Attendance Report</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row g-2">
          <div className="col-md-4">
            <select name="studentId" className="form-select" value={filters.studentId} onChange={handleChange}>
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select name="subjectId" className="form-select" value={filters.subjectId} onChange={handleChange}>
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name} ({sub.class})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input type="date" name="date" className="form-control" value={filters.date} onChange={handleChange} />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-info w-100">View</button>
          </div>
        </div>
      </form>

      {report.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {report.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.studentId?.name}</td>
                <td>{entry.studentId?.rollNo}</td>
                <td>{entry.subjectId?.name}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${entry.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportPage;