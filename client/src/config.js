// config.js
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';
export default API_BASE_URL;
