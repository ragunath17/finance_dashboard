import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api/' });

export const registerUser = (userData) => API.post('users/register/', userData);
export const loginUser = (credentials) => API.post('users/login/', credentials);

export const getSummary = (token) => API.get('finance/summary/', {
    headers: { Authorization: `Token ${token}` }
});

export const getRecent = (token) => API.get('finance/recent-transactions/', {
    headers: { Authorization: `Token ${token}` }
});

export const createRecord = (token, recordData) => API.post('finance/records/', recordData, {
    headers: { Authorization: `Token ${token}` }
});