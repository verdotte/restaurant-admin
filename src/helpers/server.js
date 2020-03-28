import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = localStorage.getItem('token') || undefined;
const server = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  headers: {
    Authorization: token && `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

server.interceptors.request.use(
  async (config) => {
    const userToken = await localStorage.getItem('token');
    if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default server;
