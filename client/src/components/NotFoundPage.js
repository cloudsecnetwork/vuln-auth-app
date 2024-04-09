import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container" style={{ backgroundColor: 'white', padding: '16px' }}>
            <div className="jumbotron" style={{ backgroundColor: '#9C27B0', color: '#ffffff' }}>
                <h1 className="display-5">404 - Page Not Found</h1>
                <p className="lead">The page you are looking for does not exist.</p>
                <hr className="my-4" />
                <p>Click <Link to="/">here</Link> to go back to the home page.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
