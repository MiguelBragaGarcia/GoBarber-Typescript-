import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
// Acessar API no PC 'http://localhost:3333'
// http://192.168.0.106:3333 server API acessa pelo celular tbm
