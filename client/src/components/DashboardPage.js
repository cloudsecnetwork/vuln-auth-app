import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config'; // Import the API base URL from the config file

const DashboardPage = () => {
    const [userData, setUserData] = useState(null);
    const [updatePasswordDialogOpen, setUpdatePasswordDialogOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to login if token is not found
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/v1/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const responseData = response.data;
                if (responseData.success) {
                    setUserData(responseData.data);
                } else {
                    navigate('/login'); // Redirect to login if response is not successful
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                navigate('/login'); // Redirect to login if an error occurs
            }
        };

        fetchDashboardData();
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 3000); // Hide the success message after 3 seconds

        return () => clearTimeout(timer);
    }, [successMessage]);

    if (!userData) {
        return null; // You can render a loading spinner or message here
    }

    // Destructure user and transactions from userData
    const { user, transactions } = userData;

    const purpleColor = {
        backgroundColor: '#9C27B0',
        color: '#ffffff' // White text on purple background
    };

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '15px', // Rounded corners
        marginBottom: '15px' // Added some margin at the bottom
    };

    const txnTextStyle = {
        color: 'red' // Red text color for "debit" text
    };

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to login page
    };

    const handleUpdatePassword = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/api/v1/update-password`, {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Password updated successfully:', response.data);
            setSuccessMessage('Password updated successfully');
            setUpdatePasswordDialogOpen(false);
        } catch (error) {
            console.error('Error updating password:', error.response.data);
            setError(error.response.data.message || 'An error occurred during password update');
        }
    };

    return (
        <div className="container" style={{ backgroundColor: 'white', padding: '16px' }}>

            {/* Welcome message */}
            <div className="jumbotron" style={purpleColor}>
                <h1 className="display-5">Welcome {user.username}</h1>
                <p>Here you can view your account details and perform some actions</p>
            </div>

            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}

            {/* Available balance */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">${user.accountBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h5>
                    <p className="card-text">Available Balance</p> {/* Format balance with commas */}
                </div>
            </div>

            {/* Options */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h5 className="card-title">Change Password</h5>
                            <p className="card-text">Update your account's login credentials</p>
                            <button className="btn btn-primary" style={{ backgroundColor: '#9C27B0' }} onClick={() => setUpdatePasswordDialogOpen(true)}>Update</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h5 className="card-title">Sign Out</h5>
                            <p className="card-text">End your session and logout from your account</p>
                            <button className="btn btn-primary" style={{ backgroundColor: '#9C27B0' }} onClick={handleSignOut}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card" style={{ backgroundColor: '#E1BEE7', borderRadius: '10px' }}>
                <div className="card-body">
                    <h5 className="card-title mb-4">Recent Transactions</h5>
                    <div className="list-group">
                        {transactions.map(transaction => (
                            <Link to={`/transaction/${transaction.reference}`} key={transaction.reference} className="card mb-3" style={cardStyle}>
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="card-subtitle mb-2 text-muted" style={txnTextStyle}>{transaction.type}</h6>
                                        <p className="card-text">{transaction.description}</p>
                                    </div>
                                    <p className="card-text">${transaction.amount.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Update Password Dialog */}
            {updatePasswordDialogOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Password</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setUpdatePasswordDialogOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Password update form */}
                                <div className="form-group">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdatePassword}>Update</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setUpdatePasswordDialogOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
