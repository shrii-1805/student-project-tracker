import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  addMember: (id, memberName) => api.post(`/projects/${id}/team`, { memberName }),
  delete: (id) => api.delete(`/projects/${id}`)
};

export const taskService = {
  getByProject: (projectId) => api.get(`/tasks/project/${projectId}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  addComment: (id, text) => api.post(`/tasks/${id}/comments`, { text }),
  delete: (id) => api.delete(`/tasks/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData)
};

export default api;
