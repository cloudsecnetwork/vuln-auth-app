// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/csn');
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
