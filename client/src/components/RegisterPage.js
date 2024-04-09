import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import the API base URL from the config file

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameBlurred, setUsernameBlurred] = useState(false);
    const [passwordBlurred, setPasswordBlurred] = useState(false);
    const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const validUsername = (username) => {
        // Add your username validation logic here
        return username.trim() !== '';
    };

    const validPassword = (password) => {
        // Add your password validation logic here
        return password.length >= 8;
    };

    const passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validUsername(username) && validPassword(password) && passwordsMatch(password, confirmPassword)) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/register`, { username, password });
                console.log('Registration Successful:', response.data);
                setSubmitted(true);
            } catch (error) {
                console.error('Registration Error:', error.response.data);
                setError(error.response.data.message || 'An error occurred during registration');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5" id="registerForm">
                        <h2 className="text-center mb-4">Register</h2>
                        <p className="text-center mb-4">Create or register an account</p>
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
                            <div className="forms-inputs mb-4">
                                <span>Confirm Password</span>
                                <input
                                    autoComplete="off"
                                    type="password"
                                    value={confirmPassword}
                                    className={`form-control ${confirmPasswordBlurred && !passwordsMatch(password, confirmPassword) ? 'is-invalid' : ''}`}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={() => setConfirmPasswordBlurred(true)}
                                />
                                {!passwordsMatch(password, confirmPassword) && confirmPasswordBlurred && <div className="invalid-feedback">Passwords do not match!</div>}
                            </div>
                            <div className="mb-3">
                                <button onClick={handleSubmit} className="btn btn-primary w-100" style={{ backgroundColor: '#9C27B0', borderColor: '#9C27B0' }}>Register</button>
                            </div>
                        </div>
                        <div className="success-data" style={{ display: submitted ? 'block' : 'none' }}>
                            <div className="text-center d-flex flex-column">
                                <i className="bx bxs-badge-check"></i>
                                <span className="text-center fs-1">Your account has been created successfully!</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <a href="/login">Back to Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
