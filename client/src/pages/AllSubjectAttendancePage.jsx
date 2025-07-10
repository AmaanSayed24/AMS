import React, { useEffect, useState } from 'react';
import { getSubjects, getStudents, fetchReport } from '../api';

function AllSubjectAttendancePage() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getSubjects().then((res) => setSubjects(res.data));
    getStudents().then((res) => setStudents(res.data));
  }, []);

  const handleChange = (e) => setSubjectId(e.target.value);

  const handleFetch = async () => {
    const res = await fetchReport({ subjectId });
    setRecords(res.data);
  };

  const groupedRecords = {};
  records.forEach((rec) => {
    const sid = rec.studentId?._id;
    if (!groupedRecords[sid]) {
      groupedRecords[sid] = [];
    }
    groupedRecords[sid].push(rec);
  });

  return (
    <div>
      <h4>All Attendance for Subject</h4>
      <div className="row mb-3">
        <div className="col-md-6">
          <select className="form-select" value={subjectId} onChange={handleChange}>
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.name} ({sub.class})</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-info w-100" onClick={handleFetch}>View</button>
        </div>
      </div>

      {Object.keys(groupedRecords).length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Total Days</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedRecords).map(([sid, entries]) => {
              const student = students.find((s) => s._id === sid);
              const presentCount = entries.filter((e) => e.status === 'Present').length;
              const absentCount = entries.filter((e) => e.status === 'Absent').length;
              return (
                <tr key={sid}>
                  <td>{student?.name}</td>
                  <td>{student?.rollNo}</td>
                  <td>{entries.length}</td>
                  <td><span className="badge bg-success">{presentCount}</span></td>
                  <td><span className="badge bg-danger">{absentCount}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllSubjectAttendancePage;