const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path"); // Import the path module to handle file paths

const { connectDB } = require('./db'); // Import the database connection module
const port = process.env.NODE_PORT || 8080;

// Set up the express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));

// Serve static files from the React production build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Routes
app.use("/status", require("./routes/index"));
app.use("/api/v1", require("./routes/register"));
app.use("/api/v1", require("./routes/login"));
app.use("/api/v1", require("./routes/forgotPassword"));
app.use("/api/v1", require("./routes/dashboard"));
app.use("/api/v1", require("./routes/updatePassword"));
app.use("/api/v1", require("./routes/transactionDetail"));
app.use("/admin", require("./routes/admin"));
app.use("/db", require("./routes/admin"));

// Serve index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, console.log(`Server Started on Port ${port} -/-/-/-`));
