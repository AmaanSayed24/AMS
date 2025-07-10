import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', rollNo: '', class: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateStudent(editingId, form);
      setEditingId(null);
    } else {
      await createStudent(form);
    }
    setForm({ name: '', rollNo: '', class: '' });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, rollNo: student.rollNo, class: student.class });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div>
      <h4>Manage Students</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row g-2">
          <div className="col">
            <input type="text" name="name" placeholder="Name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="rollNo" placeholder="Roll No" className="form-control" value={form.rollNo} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="class" placeholder="Class" className="form-control" value={form.class} onChange={handleChange} required />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.class}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(student)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentPage;