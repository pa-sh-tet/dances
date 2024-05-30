import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getDances = () => api.get('/dances');
export const getUsers = () => api.get('/users');
export const addUser = (user) => api.post('/users', user);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
export const addDance = (dance) => api.post('/dances', dance);
export const deleteDance = (danceId) => api.delete(`/dances/${danceId}`);