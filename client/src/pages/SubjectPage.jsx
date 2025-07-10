import React, { useEffect, useState } from 'react';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../api';

function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: '', class: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res = await getSubjects();
    setSubjects(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateSubject(editingId, form);
      setEditingId(null);
    } else {
      await createSubject(form);
    }
    setForm({ name: '', class: '' });
    fetchSubjects();
  };

  const handleEdit = (subject) => {
    setForm({ name: subject.name, class: subject.class });
    setEditingId(subject._id);
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
    fetchSubjects();
  };

  return (
    <div>
      <h4>Manage Subjects</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row g-2">
          <div className="col">
            <input type="text" name="name" placeholder="Subject Name" className="form-control" value={form.name} onChange={handleChange} required />
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
            <th>Subject Name</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.name}</td>
              <td>{subject.class}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(subject)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(subject._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectPage;