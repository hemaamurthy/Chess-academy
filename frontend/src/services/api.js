import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({ baseURL: API_URL });

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('chess_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const getMe = () => api.get('/me');
export const changePassword = (data) => api.put('/change-password', data);

// Students (tutor only)
export const getStudents = (search = '') =>
  api.get('/students', { params: search ? { search } : {} });

// Sessions
export const getSessions = () => api.get('/sessions');
export const createSession = (data) => api.post('/sessions', data);
export const updateSession = (id, data) => api.put(`/sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/sessions/${id}`);

export default api;
