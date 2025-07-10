import React, { useEffect, useState } from 'react';
import { getStudents, getSubjects, markAttendance } from '../api';

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ class: '', subjectId: '', date: '', attendance: {} });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [studentRes, subjectRes] = await Promise.all([getStudents(), getSubjects()]);
    setStudents(studentRes.data);
    setSubjects(subjectRes.data);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (studentId) => {
    setForm((prev) => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [studentId]: prev.attendance[studentId] === 'Present' ? 'Absent' : 'Present'
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = Object.entries(form.attendance).map(([studentId, status]) => ({
      studentId,
      subjectId: form.subjectId,
      date: form.date,
      status
    }));
    for (let entry of payload) {
      await markAttendance(entry);
    }
    alert('Attendance marked!');
    setForm({ class: '', subjectId: '', date: '', attendance: {} });
  };

  const filteredStudents = students.filter((s) => s.class === form.class);
  const filteredSubjects = subjects.filter((sub) => sub.class === form.class);

  return (
    <div>
      <h4>Mark Attendance</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row g-2 mb-2">
          <div className="col-md-3">
            <input type="date" name="date" className="form-control" value={form.date} onChange={handleFormChange} required />
          </div>
          <div className="col-md-3">
            <input type="text" name="class" className="form-control" placeholder="Class" value={form.class} onChange={handleFormChange} required />
          </div>
          <div className="col-md-4">
            <select name="subjectId" className="form-select" value={form.subjectId} onChange={handleFormChange} required>
              <option value="">Select Subject</option>
              {filteredSubjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Submit</button>
          </div>
        </div>
      </form>

      {filteredStudents.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-secondary">
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={form.attendance[student._id] === 'Present'}
                    onChange={() => handleCheckboxChange(student._id)}
                  /> Present
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendancePage;