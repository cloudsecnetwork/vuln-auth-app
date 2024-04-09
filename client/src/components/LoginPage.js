import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'; // Import the API base URL from the config file

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameBlurred, setUsernameBlurred] = useState(false);
    const [passwordBlurred, setPasswordBlurred] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validUsername = (username) => {
        return username.trim() !== '';
    };

    const validPassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validUsername(username) && validPassword(password)) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/login`, { username, password }); // Use API_BASE_URL
                console.log('Login Successful:', response.data);
                // Store the token in local storage
                localStorage.setItem('token', response.data.token);
                setSubmitted(true);
                // Redirect to dashboard upon successful login
                navigate('/');
            } catch (error) {
                console.error('Login Error:', error.response.data);
                setError(error.response.data.message || 'An error occurred during login');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5" id="loginForm">
                        <h2 className="text-center mb-4">CSN Cloudathon</h2>
                        <p className="text-center mb-4">Please login to continue</p>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}

                        <div className="form-data" style={{ display: submitted ? 'none' : 'block' }}>
                            <div className="forms-inputs mb-4">
                                <span>Username</span>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    value={username}
                                    className={`form-control ${usernameBlurred && !validUsername(username) ? 'is-invalid' : ''}`}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={() => setUsernameBlurred(true)}
                                />
                                {!validUsername(username) && usernameBlurred && <div className="invalid-feedback">A valid username is required!</div>}
                            </div>
                            <div className="forms-inputs mb-4">
                                <span>Password</span>
                                <input
                                    autoComplete="off"
                                    type="password"
                                    value={password}
                                    className={`form-control ${passwordBlurred && !validPassword(password) ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => setPasswordBlurred(true)}
                                />
                                {!validPassword(password) && passwordBlurred && <div className="invalid-feedback">Password must be 8 characters long!</div>}
                            </div>
                            <div className="mb-3">
                                <button onClick={handleSubmit} className="btn btn-primary w-100" style={{ backgroundColor: '#9C27B0', borderColor: '#9C27B0' }}>Login</button>
                            </div>
                            <div className="text-center">
                                <a href="/forgot-password">Forgot Password?</a> | <a href="/register">Create Account</a>
                            </div>
                        </div>
                        <div className="success-data" style={{ display: submitted ? 'block' : 'none' }}>
                            <div className="text-center d-flex flex-column">
                                <i className="bx bxs-badge-check"></i>
                                <span className="text-center fs-1">You have been logged in <br /> Successfully</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
