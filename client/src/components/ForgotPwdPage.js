import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import the API base URL from the config file

function ForgotPwdPage() {
    const [username, setUsername] = useState('');
    const [usernameBlurred, setUsernameBlurred] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [showRecoveryCodeInput, setShowRecoveryCodeInput] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState('');
    const [recoveryCodeBlurred, setRecoveryCodeBlurred] = useState(false);
    const [passwordRecovered, setPasswordRecovered] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validUsername = (username) => {
        // You can implement your validation logic for username here
        // For simplicity, let's assume any non-empty username is valid
        return username.trim() !== '';
    };

    const validRecoveryCode = (code) => {
        // You can implement your validation logic for recovery code here
        // For simplicity, let's assume any 4-digit code is valid
        return /^\d{4}$/.test(code);
    };

    const handleUsernameBlur = () => {
        setUsernameBlurred(true);
        setUsernameValid(validUsername(username));
    };

    const handleNext = () => {
        if (validUsername(username)) {
            setShowRecoveryCodeInput(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validRecoveryCode(recoveryCode)) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/forgot-password`, { username, recoveryCode });
                if (response.data.success) {
                    console.log('Password Recovery Successful:', response.data.message);
                    if (response.data.newPassword) {
                        console.log('New Password:', response.data.newPassword);
                        setNewPassword(response.data.newPassword);
                        setPasswordRecovered(true);
                        return;
                    }
                }
                console.error('Request failed:', response.data.message);
                setErrorMessage(response.data.message);
            } catch (error) {
                console.error('Password Recovery Error:', error.response.data);
                setErrorMessage(error.response.data.message || 'An error occurred during password recovery.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5" id="forgotPwdForm">
                        <h2 className="text-center mb-4">Forgot Password</h2>
                        <p className="text-center mb-4">Provide your username and recovery code</p>
                        {!showRecoveryCodeInput ? (
                            <form>
                                <div className="forms-inputs mb-4">
                                    <div className='mb-2'>Username</div>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        value={username}
                                        className={`form-control ${usernameBlurred && !usernameValid ? 'is-invalid' : ''}`}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleUsernameBlur}
                                    />
                                    {!usernameValid && usernameBlurred && <div className="invalid-feedback">A valid username is required!</div>}
                                </div>
                                <div className="mb-3">
                                    <button onClick={handleNext} className="btn btn-primary w-100" style={{ backgroundColor: '#9C27B0', borderColor: '#9C27B0' }}>Next</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                {passwordRecovered ? (
                                    <div className="alert alert-success" role="alert">
                                        Your password has been reset successfully. Here's your new password: <strong>{newPassword}</strong>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {errorMessage && (
                                            <div className="alert alert-danger" role="alert">
                                                {errorMessage}
                                            </div>
                                        )}
                                        <div className="forms-inputs mb-4">
                                            <div className='mb-2'>Recovery Code</div>
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                value={recoveryCode}
                                                className={`form-control ${recoveryCodeBlurred && !validRecoveryCode(recoveryCode) ? 'is-invalid' : ''}`}
                                                onChange={(e) => setRecoveryCode(e.target.value)}
                                                onBlur={() => setRecoveryCodeBlurred(true)}
                                            />
                                            {!validRecoveryCode(recoveryCode) && recoveryCodeBlurred && <div className="invalid-feedback">A valid 4-digit recovery code is required!</div>}
                                        </div>
                                        <div className="mb-3">
                                            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#9C27B0', borderColor: '#9C27B0' }}>Submit</button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                        <div className="text-center">
                            <a href="/login">Back to Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPwdPage;
