import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'; // Import the API base URL from the config file

const TransactionDetailsPage = () => {
    const { reference } = useParams(); // Get the transaction ID from the URL params
    const [transactionData, setTransactionData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to login page if token does not exist
                    return;
                }

                // Fetch transaction details from the API with bearer token
                const response = await axios.get(`${API_BASE_URL}/api/v1/transactions/${reference}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const responseData = response.data;

                if (responseData.success) {
                    // Set the transaction data
                    setTransactionData(responseData.data);
                } else {
                    setError('Failed to fetch transaction details');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Redirect to login page if unauthorized
                    navigate('/login');
                } else {
                    console.error('Error fetching transaction details:', error);
                    setError('No transaction found with the provided reference');
                }
            }
        };

        fetchTransactionDetails();
    }, [reference, navigate]);

    if (error) {
        return (
            <div className="container" style={{ backgroundColor: 'white', padding: '16px' }}>
                {/* Error message */}
                <div className="card mb-3">
                    <div className="card-body text-center">
                        <h3 className="card-title mb-4">Error</h3>
                        <p className="card-text">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!transactionData) {
        return <div>Loading...</div>; // Render a loading spinner or message while data is being fetched
    }

    // Destructure transaction and user from transactionData
    const { transaction, user } = transactionData;

    const purpleColor = {
        backgroundColor: '#9C27B0',
        color: '#ffffff' // White text on purple background
    };

    const capitalizedTextStyle = {
        textTransform: 'uppercase' // Capitalize text
    };

    return (
        <div className="container" style={{ backgroundColor: 'white', padding: '16px' }}>
            {/* Welcome message */}
            <div className="card mb-3" style={purpleColor}>
                <div className="card-body">
                    <h3 className="card-title mb-4">Transaction Details</h3>
                    <p className="card-text"><b>Account:</b> {user.username}</p>
                    <p className="card-text"><b>Date/Time:</b> {new Date(transaction.createdAt).toLocaleString()}</p>
                </div>
            </div>

            {/* Transaction details */}
            <div className="card mb-3">
                <div className="card-body">
                    <h4 className="card-title mb-4">{transaction.description}</h4>
                    <p className="card-text"><b>Reference:</b> {transaction.reference}</p>
                    <p className="card-text">
                        <b>Status:</b>
                        <span className="badge rounded-pill bg-secondary p-2 ml-1 text-white">{transaction.status}</span>
                    </p>
                    <p className="card-text">
                        <b>Type: </b>
                        <span>{transaction.type}</span>
                    </p>
                    <p className="card-text"><b>Amount:</b> ${transaction.amount.toFixed(2)}</p>
                    <p className="card-text">
                        <b>Channel: </b>
                        <span style={capitalizedTextStyle}>{transaction.channel}</span>
                    </p>
                    <p className="card-text"><b>Card Type:</b> {transaction.cardType}</p>
                    <p className="card-text"><b>Terminal ID:</b> {transaction.terminalID}</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsPage;
