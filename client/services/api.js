// services/api.js
import axios from 'axios';

const baseURL = '/api/v1'; // Base URL for your API endpoints

const api = axios.create({
    baseURL,
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/forgotPassword', { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchDashboardData = async () => {
    try {
        const response = await api.get('/dashboard');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
