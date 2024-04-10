// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI;
        if (!dbURI) {
            throw new Error('MongoDB connection string not provided in environment variable MONGODB_URI');
        }
        await mongoose.connect(dbURI);
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

const closeDB = () => {
    mongoose.connection.close();
    console.log('MongoDB connection closed!');
};

module.exports = { connectDB, closeDB };
