import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getStudents = () => API.get('/students');
export const createStudent = (data) => API.post('/students', data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export const getSubjects = () => API.get('/subjects');
export const createSubject = (data) => API.post('/subjects', data);
export const updateSubject = (id, data) => API.put(`/subjects/${id}`, data);
export const deleteSubject = (id) => API.delete(`/subjects/${id}`);

export const markAttendance = (data) => API.post('/attendance/mark', data);
export const fetchReport = (params) => API.get('/attendance/report', { params });